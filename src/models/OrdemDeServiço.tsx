import { v4 as uuid } from "uuid";

export class OrdemDeServico {
    private id: string;
    private titulo: string;
    private detalhes: string;

    constructor(id: string, titulo: string, detalhes: string) {
        this.id = id === undefined ? uuid() : id;
        this.titulo = titulo;
        this.detalhes = detalhes;
    }

    static listarTodas(): OrdemDeServico[] {
        return [
            new OrdemDeServico("1", 'Ordem #1', 'Troca de óleo e filtros.'),
            new OrdemDeServico("2", 'Ordem #2', 'Revisão dos freios.'),
            new OrdemDeServico("3", 'Ordem #3', 'Alinhamento e balanceamento.'),
        ];
    }

    static buscarPorId(id: string): OrdemDeServico | undefined {
        return OrdemDeServico.listarTodas().find(ordem => ordem.getId() === id);
    }
    public getId(){
        return this.id;
    }
    
    public getTitulo(){
        return this.titulo;
    }
    
    public getDetalhes(){
        return this.detalhes;
    }
}



