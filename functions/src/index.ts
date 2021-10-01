import * as functions from "firebase-functions";
import { LaudoInternacao } from "./models/laudo-internacao";
import { Leito } from "./models/leito";
import { Prontuario } from "./models/prontuario";
import { Quarto } from "./models/quarto";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.updateValidation = functions.firestore
    .document('validation/{validationId}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        console.log("new update in Validation");
        console.log(newValue);

        if (newValue.alocar) {
            allocByValidation(newValue.id);
        }
    });

exports.updateOptimisation = functions.firestore
    .document('optimiserResult/{optimiserResultId}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        console.log("new update in OptimiserResult");
        console.log(newValue);

        if (newValue.alocar) {
            allocByOptimisation(newValue.id);
        }
    });


export const allocPatients = functions.https.onRequest((request, response) => {
    if (request.method != "POST") {
        response.status(405).send('HTTP Method ' + request.method + ' not allowed');
        return;
    }
    console.log('Request headers: ', JSON.stringify(request.headers));
    console.log('Request body: ', JSON.stringify(request.body));

    functions.logger.info("Alocar pacientes", { structuredData: true });
    if (request.body.type == "validation") {
        allocByValidation(request.body.id);
        response.status(200).send("Alocando!");
    } else if (request.body.type == "optimisation") {
        allocByOptimisation(request.body.id);
        response.status(200).send("Alocando!");
    } else {
        response.status(412).send('Missing or unrecognized type');
    }
});

function allocByOptimisation(id: string) {
    return admin.firestore().collection('optimiserResult').where('id', '==', id).limit(1)
        .get().then((snapshot: any) => {
            let optimiserResult = snapshot.docs[0].data();
            let optimiserResultId = snapshot.docs[0].id;
            let laudos = optimiserResult.laudosData;
            let pacientes: LaudoInternacao[] = [];
            laudos.forEach((element: LaudoInternacao) => {
                if (element.leito) {
                    pacientes.push(element);
                }
            });
            console.log("Chamar função alocarPacientes()");
            alocarPacientes(pacientes);
            optimiserResult.alreadySuggested = true;
            admin.firestore().collection('optimiserResult').doc(optimiserResultId).set(optimiserResult);
            return;
        }).catch((error: any) => {
            console.log("deu erro! 03");
            console.log(error);
            return;
        });

}

function allocByValidation(id: string) {
    return admin.firestore().collection('validacoes').where('id', '==', id).limit(1)
        .get().then((snapshot: any) => {
            let validacao = snapshot.docs[snapshot.docs.length - 1].data();
            let validacaoId = snapshot.docs[snapshot.docs.length - 1].id;
            let pacientes = snapshot.docs[snapshot.docs.length - 1].data().pacientes;
            console.log("pacientes: ", pacientes);
            if (validacao.concluido === true) {
                console.log("if (validacao.concluido)");
                return;
            } else {
                console.log("Chamar função alocarPacientes()");
                alocarPacientes(pacientes);
                validacao.concluido = true;
                admin.firestore().collection('validacoes').doc(validacaoId).set(validacao);
                return;
            }

        }).catch((error: any) => {
            console.log("deu erro! 03");
            console.log(error);
            return;
        });
}
function alocarPacientes(pacientes: LaudoInternacao[]) {
    console.log("Função alocarPacientes() Chamada");
    pacientes.forEach(laudo => {
        return admin.firestore().collection('prontuarios').where('prontuario', '==', laudo.prontuario).limit(1)
            .get().then(
                (snapshot0: any) => {
                    let prontuario = snapshot0.docs[0].data();
                    if (laudo.leito) {
                        return admin.firestore().collection('infraestrutura').where('nome', '==', laudo.leito.quarto).limit(1)
                            .get().then(
                                (snapshot1: any) => {
                                    let quarto = snapshot1.docs[0].data();
                                    let quartoId = snapshot1.docs[0].id;
                                    preparaVariaveis(laudo, prontuario, quarto).then((result: any) => {
                                        saveDb(result.laudo, result.prontuario, result.quarto, quartoId);
                                        return;
                                    }).catch((error: any) => {
                                        console.log("deu erro! 00");
                                        console.log(error);
                                        return;
                                    });
                                    return;
                                }).catch((error: any) => {
                                    console.log("deu erro! 01");
                                    console.log(error);
                                    return;
                                });
                    }
                }).catch((error: any) => {
                    console.log("deu erro! 02");
                    console.log(error);
                    return;
                });
    });
    return;
}

function preparaVariaveis(laudo: LaudoInternacao, prontuario: Prontuario, quarto: Quarto) {
    return new Promise((resolve, reject) => {
        laudo.internado = true;
        laudo.dataInternacao = (new Date()).getTime();
        if (!prontuario.internacoes) {
            prontuario.internacoes = [];
            prontuario.internacoes.push(laudo);
        } else {
            console.log("prontuario.internacoes antes: ", prontuario.internacoes);

            let index = prontuario.internacoes.findIndex((x: LaudoInternacao) => x.id === laudo.id);
            prontuario.internacoes[index] = laudo;
        }
        console.log("prontuario.internacoes depois: ", prontuario.internacoes);
        quarto.genero = laudo.genero;
        if (quarto.leitos) {
            quarto.leitos.forEach((element: Leito) => {
                console.log("quarto.leitos.forEach(element: ", element);
                if (laudo.leito) {
                    if (element.id === laudo.leito.id) {
                        element.status = 'Ocupado';
                        element.paciente = {
                            prontuario: laudo.prontuario,
                            nome: laudo.nomePaciente,
                            genero: laudo.genero,
                            idade: laudo.age,
                        };
                    }
                }
                element.genero = laudo.genero;
            });
        }
        let result = {
            laudo: laudo,
            prontuario: prontuario,
            quarto: quarto
        }
        resolve(result);
        return;
    })
}
function saveDb(laudo: LaudoInternacao, prontuario: Prontuario, quarto: Quarto, quartoId: string) {
    console.log("saveDb laudo: ", laudo);
    console.log("saveDb prontuario: ", prontuario);
    console.log("saveDb quarto: ", quarto);
    admin.firestore().collection('laudosInternacao').doc(laudo.id).set(laudo);
    admin.firestore().collection('prontuarios').doc(prontuario.id).set(prontuario);
    if (quarto.leitos) {
        quarto.leitos.forEach((element: Leito) => {
            admin.firestore().collection('leitos').doc(element.id).set(element);
            console.log("foreach saveDb leito: ", element);
        })
    }
    admin.firestore().collection('infraestrutura').doc(quartoId).set(quarto);
    console.log("Alterado no banco");

    return;
}

