import {Leito} from "./leito";

export interface Quarto {
    id?: string;
    nome?: string;
    especialidade?: string;
    tipoDeLeito?: string;
    tipoDeEstadia?: string;
    tipoDeEncaminhamento?: string;
    tipoDeCuidado?: string;
    age?: string;
    genero?: string;
    leitos?: Leito[];
    numLeitos?: string;
}
