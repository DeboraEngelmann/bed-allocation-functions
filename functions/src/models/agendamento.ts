import {Paciente} from "./paciente";
import {Profissional} from "./profissional";

export interface Agendamento {
    id?: string;
    nomePaciente?: string;
    prontuario?: string;
    paciente?: Paciente;
    tipo?: string;
    especialidade?: string;
    nomeMedico?: string
    medico?: Profissional;
    dataProcedimento?: number;
    descricao?: string;
    cancelado?: boolean;
}
