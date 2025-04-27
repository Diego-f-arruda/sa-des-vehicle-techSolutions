'use client'

import TableOrder from '@/components/TableOrder/page';
import './styles.css'
import { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@/components/Button';
import PlanoCarregando from '@/components/PlanoCarregando';



type ServiceOrder = {
    id: string;
    titulo: string;
    itens: ItemDaOrdem[];
}

type ItemDaOrdem = {
    id: string;
    nome: string;
    descricao: string;
    quantidade: number;
    concluido: boolean;
}


export default function Manutencao() {
    const [ordemSelecionada, setOrdemSelecionada] = useState<ServiceOrder | null>(null);
    const [OrdemDeServico, setOrdemDeServico] = useState<ServiceOrder[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [itensSelecionados, setItensSelecionados] = useState<string[]>([]); 
    const [todosItensConcluidos, setTodosItensConcluidos] = useState<boolean>(false);

    useEffect(() => {
        loadManutencao();
    }, []);

    async function loadManutencao() {
        try {
            setCarregando(true);
            const response = await axios.get<ServiceOrder[]>("http://localhost:3001/manutencao");
            const ordemSort = response.data.sort((a: any, b: any) => (
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            ));

            setOrdemDeServico(ordemSort);
        } catch (error) {
            console.log(error)
        } finally {
            setCarregando(false);
        }
    }
    //verificar para mudar e apresentar apenas a lista dentro da ordem e nao o array de ordens de serviço de exemplo
    const serviceOrderList = OrdemDeServico.length > 0 ? OrdemDeServico : [
        {
            id: "1",
            titulo: "Ordem #1",
            itens: [
                { id: "1", nome: "Troca de óleo", descricao: "Óleo 5W30", quantidade: 1, concluido: false },
                { id: "2", nome: "Filtro de óleo", descricao: "Filtro original", quantidade: 1, concluido: false },
            ]
        },
        {
            id: "2",
            titulo: "Ordem #2",
            itens: [
                { id: "3", nome: "Pastilha de freio", descricao: "Dianteira", quantidade: 2, concluido: false },
                { id: "4", nome: "Disco de freio", descricao: "Traseiro", quantidade: 2, concluido: false },
            ]
        },
    ];

    useEffect(() => {
        if (ordemSelecionada && ordemSelecionada.itens) {
            setTodosItensConcluidos(itensSelecionados.length === ordemSelecionada.itens.length && ordemSelecionada.itens.length > 0);
        } else {
            setTodosItensConcluidos(false);
        }
    }, [itensSelecionados, ordemSelecionada]);

    return (
        <div className="manutencao-container">
            <div className="ordens-abertas">
                <div className="lista-ordem">Ordens Abertas</div>
                {serviceOrderList.map((ordem) => (
                    <div
                        key={ordem.id}
                        className="ordem"
                        onClick={() => setOrdemSelecionada(ordem)}
                    >
                        {ordem.titulo}
                    </div>
                ))}
            </div>

            <div className="revisao">



                {carregando ? (
                    <PlanoCarregando/>
                ) : ordemSelecionada ? (
                    <TableOrder
                        checkboxSelection
                        columns={[
                            { field: 'id', headerName: 'ID', width: 50, hideable: true },
                            { field: 'concluido', headerName: '', width: 70, type: 'boolean' },
                            { field: 'nome', headerName: 'Item', width: 150 },
                            { field: 'descricao', headerName: 'Descrição', width: 250 },
                            { field: 'quantidade', headerName: 'Qtd', width: 100 },
                        ]}
                        serviceOrder={ordemSelecionada.itens}
                        paginationModel={{ page: 0, pageSize: 10 }}
                        //linha abaixo para eu conseguir controlar a seleção
                        onRowSelectionModelChange={(newSelectionModel) => { setItensSelecionados(newSelectionModel) }} 
                    />


                ) : (
                    <strong>
                        <p>Selecione uma ordem para ver os detalhes</p>
                    </strong>
                )}
                <Button disabled={!todosItensConcluidos} onClick={() =>{

                }} />
            </div>
        </div>
    );

}