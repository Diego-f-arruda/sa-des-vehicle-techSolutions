
'use client'

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, CircularProgress, Button, TextField } from '@mui/material';
import './styles.css';

type TipoCambio = 'AUTOMATICO' | 'MANUAL';
type CorVeiculo = 'PRETO' | 'BRANCO' | 'PRATA' | 'VERMELHO' | 'AZUL';
type StatusVeiculo = 'REPROVADO' | 'EM_PRODUCAO';

type Veiculo = {
    id: string;
    modelo: string;
    cor: CorVeiculo;
    cambio: TipoCambio;
    status: StatusVeiculo;

};

// Componente SelectRadio (você pode ter um arquivo separado para ele)
// src/components/SelectRadio.tsx
type SelectRadioProps = {
    value: boolean | null; // true para Aprovado, false para Reprovado, null para não avaliado
    onChange: (value: boolean | null) => void;
    disabled?: boolean;
};

const SelectRadio: React.FC<SelectRadioProps> = ({ value, onChange, disabled }) => {
    return (
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <Select
                value={value === true ? 'true' : value === false ? 'false' : ''} // Converte boolean para string
                onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
                displayEmpty
                disabled={disabled}
            >
                <MenuItem value="">Não Avaliado</MenuItem>
                <MenuItem value="true">Aprovado</MenuItem>
                <MenuItem value="false">Reprovado</MenuItem>
            </Select>
        </FormControl>
    );
};


export default function Qualidade() {
    const [veiculosEmProducao, setVeiculosEmProducao] = useState<Veiculo[]>([]);
    const [selectedVeiculoId, setSelectedVeiculoId] = useState<string | null>(null);
    const [loadingVeiculos, setLoadingVeiculos] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [motorAprovado, setMotorAprovado] = useState<boolean | null>(null);
    const [pinturaAprovada, setPinturaAprovada] = useState<boolean | null>(null);
    const [acabamentoInternoAprovado, setAcabamentoInternoAprovado] = useState<boolean | null>(null);
    const [fluidosAprovados, setFluidosAprovados] = useState<boolean | null>(null);
    const [opcionaisAprovados, setOpcionaisAprovados] = useState<boolean | null>(null);
    const [observacoes, setObservacoes] = useState('');


    useEffect(() => {
        const fetchVeiculosEmProducao = async () => {
            setLoadingVeiculos(true);
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
        fetchVeiculosEmProducao();
    }, []);

    const possivelAvaliar = selectedVeiculoId !== null &&
        motorAprovado !== null &&
        pinturaAprovada !== null &&
        acabamentoInternoAprovado !== null &&
        fluidosAprovados !== null &&
        opcionaisAprovados !== null;

    const todosAprovados = motorAprovado === true &&
        pinturaAprovada === true &&
        acabamentoInternoAprovado === true &&
        fluidosAprovados === true &&
        opcionaisAprovados === true;

    const handleSubmitAvaliacao = async () => {
        if (!possivelAvaliar) {
            setMessage('Por favor, selecione um veículo e avalie todos os critérios antes de enviar.');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const dadosCompletos = {
                veiculoId: selectedVeiculoId,
                motor: motorAprovado,
                pintura: pinturaAprovada,
                acabamentoInterno: acabamentoInternoAprovado,
                fluidos: fluidosAprovados,
                opcionais: opcionaisAprovados,
                observacoes: observacoes,
                aprovado: todosAprovados 
            };

            const response = await fetch('http://localhost:3333/qualidade', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCompletos),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao enviar avaliação de qualidade.');
            }

            setMessage('Avaliação de qualidade enviada com sucesso!');
            setSelectedVeiculoId(null);
            setMotorAprovado(null);
            setPinturaAprovada(null);
            setAcabamentoInternoAprovado(null);
            setFluidosAprovados(null);
            setOpcionaisAprovados(null);
            setObservacoes('');
            } catch (error: any) {
            setMessage(`Erro: ${error.message}`);
            console.error('Erro ao enviar avaliação:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className='avaliacao-container'>
            <h1>Qualidade do Veículo</h1>
            {message && <p style={{ color: message.startsWith('Erro') ? 'red' : 'green' }}>{message}</p>}

            <div className='veiculo-selecao-container'>
                <FormControl sx={{ width: 305, marginBottom: '10px' }} variant="outlined">
                    <InputLabel id="veiculo-qualidade-label">Selecionar Veículo</InputLabel>
                    <Select
                        labelId="veiculo-qualidade-label"
                        value={selectedVeiculoId || ''}
                        label="Selecionar Veículo"
                        onChange={(e: SelectChangeEvent<string>) => setSelectedVeiculoId(e.target.value as string)}
                        disabled={loadingVeiculos || isSubmitting}
                    >
                        {loadingVeiculos ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} /> Carregando...
                            </MenuItem>
                        ) : veiculosEmProducao.length === 0 ? (
                            <MenuItem disabled>Nenhum veículo em produção para avaliar</MenuItem>
                        ) : (
                            veiculosEmProducao.map((veiculo) => (
                                <MenuItem key={veiculo.id} value={veiculo.id}>
                                    {veiculo.modelo} (ID: {veiculo.id.substring(0, 8)}) - {veiculo.status}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            </div>

            {selectedVeiculoId && ( 
                <>
                    <p>Por favor, avalie a qualidade dos seguintes aspectos do veículo:</p>

                    <div className='criterios-container'>
                        <div className='criterio'>
                            <p>Motor</p>
                            <SelectRadio value={motorAprovado} onChange={setMotorAprovado} disabled={isSubmitting} />
                        </div>

                        <div className='criterio'>
                            <p>Pintura</p>
                            <SelectRadio value={pinturaAprovada} onChange={setPinturaAprovada} disabled={isSubmitting} />
                        </div>

                        <div className='criterio'>
                            <p>Acabamento Interno</p>
                            <SelectRadio value={acabamentoInternoAprovado} onChange={setAcabamentoInternoAprovado} disabled={isSubmitting} />
                        </div>

                        <div className="criterio">
                            <p>Fluidos</p>
                            <SelectRadio value={fluidosAprovados} onChange={setFluidosAprovados} disabled={isSubmitting} />
                        </div>

                        <div className="criterio">
                            <p>Opcionais</p>
                            <SelectRadio value={opcionaisAprovados} onChange={setOpcionaisAprovados} disabled={isSubmitting} />
                        </div>
                    </div>

                    <div className='comentario-container'>
                        <p>Deixe um comentário:</p>
                        <TextField
                            name="observacoes"
                            placeholder="Escreva aqui..."
                            multiline
                            rows={4}
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            fullWidth
                            variant="outlined"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className='botao-container'>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitAvaliacao}
                            disabled={!possivelAvaliar || isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Enviar Avaliação'}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}