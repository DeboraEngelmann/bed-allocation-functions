import {Endereco} from "./endereco";

export interface Paciente {
    // Inf prontuario
    id?: string;
    prontuario?: string;
    // Inf Pessoais
    falecido?: boolean;
    nome?: string;
    nascimento?: number;
    genero?: string;
    estadoCivil?: string;
    nomeDaMae?: string;
    nomeDoPai?: string;
    raca?: string;
    religiao?: string;
    naturalidade?: string;
    nacionalidade?: string;
    escolaridade?: string;
    // Contato
    telefone?: string;
    email?: string;
    // Endereço
    endereco?: Endereco;
    // Documentos
    cartaoSus?: string;
    rg?: string;
    ufRg?: string;
    orgaoEmissorRg?: string;
    emissaoRG?: number;
    cpf?: string;
}
