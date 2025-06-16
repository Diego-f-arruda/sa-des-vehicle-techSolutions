export type TipoCambio = 'AUTOMATICO' | 'MANUAL';
export type CorVeiculo = 'PRETO' | 'BRANCO' | 'PRATA' | 'VERMELHO' | 'AZUL';
export type StatusVeiculo = 'REPROVADO' | 'EM_PRODUCAO' | 'APROVADO'; 

export type Veiculo = {
    id: string;
    modelo: string;
    cor: CorVeiculo;
    cambio: TipoCambio;
    status: StatusVeiculo;
};

export type AvaliacaoQualidadeFormData = {
    veiculoId: string;
    motor: boolean;
    pintura: boolean;
    acabamentoInterno: boolean;
    fluidos: boolean;
    opcionais: boolean;
    observacoes: string;
    aprovado: boolean;
};