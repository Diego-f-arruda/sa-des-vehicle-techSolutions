'use client'

import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import QualidadeForm from '@/components/QualidadeForm'
import { Veiculo, AvaliacaoQualidadeFormData } from '@/types'; 
import styles from './styles.module.css'; 

export default function Qualidade() { 
    const [veiculosEmProducao, setVeiculosEmProducao] = useState<Veiculo[]>([]);
    const [loadingVeiculos, setLoadingVeiculos] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    
    const fetchVeiculosEmProducao = async () => {
        setLoadingVeiculos(true);
        setMessage(''); 
        try {
            const response = await fetch('http://localhost:3333/veiculo?status=EM_PRODUCAO');
            if (!response.ok) {
                throw new Error('Erro ao carregar veículos em produção.');
            }
            const data: Veiculo[] = await response.json();
            setVeiculosEmProducao(data);
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
            console.error('Erro ao buscar veículos:', error);
        } finally {
            setLoadingVeiculos(false);
        }
    };

    useEffect(() => {
        fetchVeiculosEmProducao();
    }, []); 

   
    const handleSubmitAvaliacao = async (data: AvaliacaoQualidadeFormData) => {
        setIsSubmitting(true);
        setMessage('');

        try {
            
            const payload = {
                veiculoId: data.veiculoId,
                motor: data.motor,
                pintura: data.pintura,
                acabamentoInterno: data.acabamentoInterno,
                fluidos: data.fluidos,
                aprovado: data.aprovado, 
                observacoes: data.observacoes,
                opcionais: data.opcionais,
            };

            const response = await fetch('http://localhost:3333/qualidade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao enviar avaliação de qualidade.');
            }

            setMessage('Avaliação de qualidade enviada com sucesso!');
            
            fetchVeiculosEmProducao();
        } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
            console.error('Erro ao enviar avaliação:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

   
    const handleFormReset = () => {
        
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Qualidade do Veículo</h1>

            {loadingVeiculos && (
                <div className={styles.loading}>
                    <CircularProgress size={30} /> Carregando veículos...
                </div>
            )}

            {!loadingVeiculos && veiculosEmProducao.length === 0 && (
                <p className={styles.noVehiclesMessage}>Nenhum veículo em produção para avaliar no momento.</p>
            )}

            <QualidadeForm
                veiculosEmProducao={veiculosEmProducao}
                loadingVeiculos={loadingVeiculos}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmitAvaliacao}
                message={message}
                setMessage={setMessage}
                onFormReset={handleFormReset}
            />
            </div>
    );
}