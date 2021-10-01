export interface Leito {
    id?: string;
    quarto?: string;
    numero?: string;
    status?: string;
    paciente?:
    {
        prontuario?: string;
        nome?: string;
        genero?: string;
        idade?: string;
    };
    especialidade?: string;
    genero?: string;
    age?: string;
    tipoDeLeito?: string;
    tipoDeEstadia?: string;
    tipoDeEncaminhamento?: string;
    tipoDeCuidado?: string;
    birthtype?: string;
    dist?: string;
}
