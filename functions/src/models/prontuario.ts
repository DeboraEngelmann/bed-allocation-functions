import {Paciente} from "./paciente";
import {Agendamento} from "./agendamento";
import {ConsultaMedica} from "./consulta-medica";
import {LaudoInternacao} from "./laudo-internacao";

export interface Prontuario {
    // Inf prontuario
    id?: string;
    prontuario?: string;
    dataCriacao?: number;
    dataAbertura?: number;
    prontuarioAnterior?: string;
    // Inf Pessoais
    idPaciente?: string;
    paciente?: Paciente;
    falecido?: boolean;
    nome?: string;
    // Documentos
    cartaoSus?: string;
    cpf?: string;
    // // Inf médicas
    consultasMedicas?: ConsultaMedica[];
    agendamentos?: Agendamento[];
    internacoes?: LaudoInternacao[];
}
