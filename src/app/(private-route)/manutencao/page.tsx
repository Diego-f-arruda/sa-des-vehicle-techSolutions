'use client'

import './styles.css'
import { useState } from 'react';
import { OrdemDeServico } from '@/models/OrdemDeServiço';

type ServiceOrder = {
    id: string;
    titulo: string;
    detalhes: string;
}

export default function Manutencao() {
    const serviceOrderList = [
        { id: "1", titulo: 'Ordem #1', detalhes: 'Troca de óleo e filtros.' },
        { id: "2", titulo: 'Ordem #2', detalhes: 'Revisão dos freios.' },
        { id: "3", titulo: 'Ordem #3', detalhes: 'Alinhamento e balanceamento.' },
    ]


    const [ordemSelecionada, setOrdemSelecionada] = useState<ServiceOrder | null>(null);
    // const ordens = OrdemDeServico.listarTodas();

    return (
        <div className="manutencao-container">
            <div className="ordens-abertas">
                <div className="lista-ordem">Lista de Ordens de serviço</div>
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

            </div>

            <div className="detalhes">
                {ordemSelecionada ? (
                    <>
                        <h2>{ordemSelecionada.titulo}</h2>
                        <p>{ordemSelecionada.detalhes}</p>
                    </>
                ) : (
                    <p>Selecione uma ordem para ver os detalhes</p>
                )}
            </div>

        </div>
    );

}