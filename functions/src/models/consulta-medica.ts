import {Paciente} from "./paciente";
import {Profissional} from "./profissional";

export interface ConsultaMedica {
    id?: string;
    paciente?: Paciente;
    prontuario?: string;
    especialidade?: string;
    tipoDeLeito?: string;
    tipoDeEncaminhamento?: string;
    tipoDeCuidado?: string;
    medicoResponsavel?: Profissional;
    diagnostico?: string;
    tratamento?: string;
    exames?: string;
    medicamentos?: string;
    internar?: string;
    dataConsulta?: number;
    tipoDeEstadia?: string;
}
