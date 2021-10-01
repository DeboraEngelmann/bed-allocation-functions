import {LaudoInternacao} from "./laudo-internacao";

export interface Validacao {

    pacientes?: LaudoInternacao[];
    saveAt?: number;
    problema?: string;
    plano?: string;
    retorno?: string;
    valido?: boolean;
    concluido?: boolean;
    id?: string;
    alocar?: boolean;
}
