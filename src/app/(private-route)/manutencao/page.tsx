'use client'

import './styles.css'
import { useState } from 'react';
import { OrdemDeServico } from '@/models/OrdemDeServiço';

type Ordem = {
    id: number;
    titulo: string;
    detalhes: string;
};
const ordensDeServico: Ordem[] = [
    { id: 1, titulo: 'Ordem #1', detalhes: 'Troca de óleo e filtros.' },
    { id: 2, titulo: 'Ordem #2', detalhes: 'Revisão dos freios.' },
    { id: 3, titulo: 'Ordem #3', detalhes: 'Alinhamento e balanceamento.' },
];

export default function Manutencao() {
    const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemDeServico | null>(null);
    return (
        <div className="manutencao-container">
            <div className="ordens-abertas">
                <div className="lista-ordem">Lista de Ordens de serviço</div>
                {ordensDeServico.map((ordem) => (
                    <div
                        key={ordem.id}
                        className="ordem"
                        onClick={() => setOrdemSelecionada(ordem)}
                    >
                        {ordem.titulo}
                    </div>
                ))}
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