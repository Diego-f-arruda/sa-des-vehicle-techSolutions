'use client'

export class OrdemDeServico {
    id: number;
    titulo: string;
    detalhes: string;

    constructor(id: number, titulo: string, detalhes: string) {
        this.id = id;
        this.titulo = titulo;
        this.detalhes = detalhes;
    }

    static listarTodas(): OrdemDeServico[] {
        return [
            new OrdemDeServico(1, 'Ordem #1', 'Troca de óleo e filtros.'),
            new OrdemDeServico(2, 'Ordem #2', 'Revisão dos freios.'),
            new OrdemDeServico(3, 'Ordem #3', 'Alinhamento e balanceamento.'),
        ];
    }

    static buscarPorId(id: number): OrdemDeServico | undefined {
        return OrdemDeServico.listarTodas().find(ordem => ordem.id === id);
    }
}
