'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import AvaliacaoCriterio from '@/components/AvaliacaoCriterio';
import { Veiculo, AvaliacaoQualidadeFormData } from '@/types';
import styles from './styles.module.css';

type QualidadeFormProps = {
    veiculosEmProducao: Veiculo[];
    loadingVeiculos: boolean;
    isSubmitting: boolean;
    onSubmit: (data: AvaliacaoQualidadeFormData) => Promise<void>;
    message: string;
    setMessage: (msg: string) => void;
    onFormReset: () => void;
};

const QualidadeForm: React.FC<QualidadeFormProps> = ({
    veiculosEmProducao,
    loadingVeiculos,
    isSubmitting,
    onSubmit,
    message,
    setMessage,
    onFormReset
}) => {
    const [selectedVeiculoId, setSelectedVeiculoId] = useState<string | null>(null);
    const [motorAprovado, setMotorAprovado] = useState<boolean | null>(null);
    const [pinturaAprovada, setPinturaAprovada] = useState<boolean | null>(null);
    const [acabamentoInternoAprovado, setAcabamentoInternoAprovado] = useState<boolean | null>(null);
    const [fluidosAprovados, setFluidosAprovados] = useState<boolean | null>(null);
    const [opcionaisAprovados, setOpcionaisAprovados] = useState<boolean | null>(null);
    const [observacoes, setObservacoes] = useState('');


    useEffect(() => {
        if (message.includes('sucesso') && !isSubmitting) {
            setSelectedVeiculoId(null);
            setMotorAprovado(null);
            setPinturaAprovada(null);
            setAcabamentoInternoAprovado(null);
            setFluidosAprovados(null);
            setOpcionaisAprovados(null);
            setObservacoes('');
            onFormReset();
            
        }
    }, [message, isSubmitting, onFormReset]);


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

    const handleSubmitLocal = async () => {
        if (!possivelAvaliar) {
            setMessage('Por favor, selecione um veículo e avalie todos os critérios antes de enviar.');
            return;
        }

        const dadosCompletos: AvaliacaoQualidadeFormData = {
            veiculoId: selectedVeiculoId!,
            motor: motorAprovado!,
            pintura: pinturaAprovada!,
            acabamentoInterno: acabamentoInternoAprovado!,
            fluidos: fluidosAprovados!,
            opcionais: opcionaisAprovados!,
            observacoes: observacoes,
            aprovado: todosAprovados,
        };

        await onSubmit(dadosCompletos);
    };


    return (
        <div className={styles.qualidadeFormContainer}>
            {message && (
                <Alert severity={message.startsWith('Erro') ? 'error' : 'success'} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}

            <div className={styles.veiculoSelecaoContainer}>
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

            {/*}so vai a abrir as avaliações se for selecionado um veiculo!*/}
            {selectedVeiculoId && (
                <>
                    <p className={styles.instrucao}>Por favor, avalie a qualidade dos seguintes aspectos do veículo:</p>

                    <div className={styles.criteriosContainer}>
                        <AvaliacaoCriterio criterio="Motor" value={motorAprovado} onChange={setMotorAprovado} disabled={isSubmitting} />
                        <AvaliacaoCriterio criterio="Pintura" value={pinturaAprovada} onChange={setPinturaAprovada} disabled={isSubmitting} />
                        <AvaliacaoCriterio criterio="Acabamento Interno" value={acabamentoInternoAprovado} onChange={setAcabamentoInternoAprovado} disabled={isSubmitting} />
                        <AvaliacaoCriterio criterio="Fluidos" value={fluidosAprovados} onChange={setFluidosAprovados} disabled={isSubmitting} />
                        <AvaliacaoCriterio criterio="Opcionais" value={opcionaisAprovados} onChange={setOpcionaisAprovados} disabled={isSubmitting} />
                    </div>

                    <div className={styles.comentarioContainer}>
                        <p className={styles.instrucao}>Deixe um comentário:</p>
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

                    <div className={styles.botaoContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitLocal}
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

export default QualidadeForm;