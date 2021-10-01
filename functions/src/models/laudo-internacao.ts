import {Leito} from "./leito";

export interface LaudoInternacao {
    id?: string;
    prontuario?: string;
    ativo?: boolean;
    nomePaciente?: string;
    genero?: string;
    age?: string;
    idPaciente?: string;
    crmMedico?: string;
    medicoResponsavel?: string;
    especialidade?: string;
    tipoDeLeito?: string;
    tipoDeEncaminhamento?: string;
    tipoDeCuidado?: string;
    internado?: boolean;
    dataInternacao?: number;
    dataAlta?: number;
    leito?: Leito;
    tipoDeEstadia?: string;
    birthtype?: string;
}
