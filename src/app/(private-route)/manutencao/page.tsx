'use client'

import './styles.css'
import { useState } from 'react';
import { OrdemDeServico } from '@/models/OrdemDeServiço';


export default function Manutencao() {
    const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemDeServico | null>(null);
    const ordens = OrdemDeServico.listarTodas();

    return (
        <div className="manutencao-container">
            <div className="ordens-abertas">
                <div className="lista-ordem">Lista de Ordens de serviço</div>
                {ordens.map((ordem) => (
                    <div
                        key={ordem.getId()}
                        className="ordem"
                        onClick={() => setOrdemSelecionada(ordem)}
                    >
                        {ordem.getTitulo()}
                    </div>
                ))}
            </div>

            <div className="detalhes">
                {ordemSelecionada ? (
                    <>
                        <h2>{ordemSelecionada.getTitulo()}</h2>
                        <p>{ordemSelecionada.getDetalhes()}</p>
                    </>
                ) : (
                    <p>Selecione uma ordem para ver os detalhes</p>
                )}
            </div>

        </div>
    );

}