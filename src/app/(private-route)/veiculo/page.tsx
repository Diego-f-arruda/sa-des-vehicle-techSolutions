'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import EntryInput from '@/components/TextArea'
import Button from '@/components/Button'
import styles from './styles.module.css'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';

enum CorVeiculo {
  PRETO = "PRETO",
  BRANCO = "BRANCO",
  PRATA = "PRATA",
  VERMELHO = "VERMELHO",
  AZUL = "AZUL"
}

enum TipoCambio {
  AUTOMATICO = "AUTOMATICO",
  MANUAL = "MANUAL"
}


enum StatusVeiculo {
  APROVADO = "APROVADO",
  REPROVADO = "REPROVADO",
  EM_PRODUCAO = "EM_PRODUCAO"
}

enum TipoAcessorio {
  PECA = "PECA",
  ELETRONICO = "ELETRONICO",
  ACABAMENTO = "ACABAMENTO",
  KIT_RODA = "KIT_RODA"
}

type Veiculo = {
  id: string;
  modelo: string;
  cor: CorVeiculo;
  cambio: TipoCambio;
  kitRodaId: string | null;
  status: StatusVeiculo;
  createdAt: string;
  updatedAt: string;
};

type Produto = {
  id: string;
  nome: string;
  quantidade: number;
  tipo: TipoAcessorio
};

export default function Producao() {

  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState<CorVeiculo>(CorVeiculo.BRANCO);
  const [cambio, setCambio] = useState<TipoCambio>(TipoCambio.MANUAL);
  const [selectedKitRodaId, setSelectedKitRodaId] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusVeiculo>(StatusVeiculo.EM_PRODUCAO);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [availableKitsRoda, setAvailableKitsRoda] = useState<Produto[]>([]);
  const [loadingKitsRoda, setLoadingKitsRoda] = useState(true);
  const [availableAcessorios, setAvailableAcessorios] = useState<Produto[]>([]); // Para depois
  const [loadingAcessorios, setLoadingAcessorios] = useState(true);

  const API_URL_VEICULO = 'http://localhost:3333/veiculo';
  const API_URL_PRODUTO = 'http://localhost:3333/produto';

  const fetchVeiculos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

      const response = await axios.get<Veiculo[]>(API_URL_VEICULO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVeiculos(response.data);
    } catch (err) {
      console.error('Erro ao buscar veículos:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Falha ao carregar veículos.');
      } else {
        setError('Falha ao carregar veículos. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchKitsRoda = async () => {
    setLoadingKitsRoda(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }
      const response = await axios.get<Produto[]>(API_URL_PRODUTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const kitsRoda = response.data.filter(produto => produto.tipo === TipoAcessorio.KIT_RODA);
      setAvailableKitsRoda(kitsRoda);
    } catch (err) {
      console.error('Erro ao buscar kits de roda:', err);
      setError('Falha ao carregar kits de roda. Verifique sua conexão ou backend.');
    } finally {
      setLoadingKitsRoda(false);
    }
  };

  useEffect(() => {
    fetchVeiculos();
    fetchKitsRoda();
  }, []);

  const handleCadastrarVeiculo = async () => {
    setFormSubmitting(true);
    setError(null);
    try {

      if (!modelo || !cor || !cambio) {
        throw new Error('Por favor, preencha Modelo, Cor e Câmbio.');
      }

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

      const novoVeiculo: Omit<Veiculo, 'id' | 'createdAt' | 'updatedAt'> = {
        modelo,
        cor,
        cambio,
        kitRodaId: selectedKitRodaId,
        status,
      };

      await axios.post(API_URL_VEICULO, novoVeiculo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Veículo cadastrado com sucesso!');

      setModelo('');
      setCor(CorVeiculo.BRANCO);
      setCambio(TipoCambio.MANUAL);
      setSelectedKitRodaId(null);
      setStatus(StatusVeiculo.EM_PRODUCAO);

      fetchVeiculos();
    } catch (err) {
      console.error('Erro ao cadastrar veículo:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Falha ao cadastrar veículo.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Falha ao cadastrar veículo.');
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className={styles['producao-container']}>
      <div className={styles.inputForm}>
        <h2>Cadastro de Veículos de Produção</h2>

        <EntryInput
          label="Modelo"
          tipo="text"
          tamanho={305}
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />


        <FormControl sx={{ width: 305, marginBottom: '10px' }} variant="outlined">
          <InputLabel id="cor-veiculo-label">Cor</InputLabel>
          <Select
            labelId="cor-veiculo-label"
            value={cor}
            label="Cor"
            onChange={(e) => setCor(e.target.value as CorVeiculo)}
            className="custom-textarea"
          >
            {Object.values(CorVeiculo).map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <FormControl sx={{ width: 305, marginBottom: '10px' }} variant="outlined">
          <InputLabel id="tipo-cambio-label">Câmbio</InputLabel>
          <Select
            labelId="tipo-cambio-label"
            value={cambio}
            label="Câmbio"
            onChange={(e) => setCambio(e.target.value as TipoCambio)}
            className="custom-textarea"
          >
            {Object.values(TipoCambio).map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 305, marginBottom: '10px' }} variant="outlined">
          <InputLabel id="kit-roda-label">Kit Roda (Opcional)</InputLabel>
          <Select
            labelId="kit-roda-label"
            value={selectedKitRodaId || ''} // Usar '' para null na seleção
            label="Kit Roda (Opcional)"
            onChange={(e) => setSelectedKitRodaId(e.target.value as string || null)}
            className="custom-textarea"
            disabled={loadingKitsRoda} // Desabilita enquanto carrega
          >
            {loadingKitsRoda ? (
              <MenuItem disabled>
                <CircularProgress size={20} /> Carregando...
              </MenuItem>
            ) : availableKitsRoda.length === 0 ? (
              <MenuItem disabled>Nenhum Kit Roda disponível</MenuItem>
            ) : (
              <>
                <MenuItem value={null}>Nenhum</MenuItem> {/* Opção para nenhum kit */}
                {availableKitsRoda.map((kit) => (
                  <MenuItem key={kit.id} value={kit.id}>
                    {kit.nome} (Qtd: {kit.quantidade})
                  </MenuItem>
                ))}
              </>
            )}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 305, marginBottom: '10px' }} variant="outlined">
          <InputLabel id="status-veiculo-label">Status</InputLabel>
          <Select
            labelId="status-veiculo-label"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as StatusVeiculo)}
            className="custom-textarea"
          >
            {Object.values(StatusVeiculo).map((option) => (
              <MenuItem key={option} value={option}>
                {option.replace('_', ' ').charAt(0).toUpperCase() + option.replace('_', ' ').slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button text={formSubmitting ? 'Cadastrando...' : 'Cadastrar'} onClick={handleCadastrarVeiculo} disabled={formSubmitting} />
      </div>

      <p id={styles.paragrafo}>Veículos Cadastrados</p>

      {error && <p className={styles.errorMessage}>Erro: {error}</p>}
      {loading ? (
        <p>Carregando veículos...</p>
      ) : veiculos.length === 0 ? (
        <p>Nenhum veículo cadastrado ainda.</p>
      ) : (
        <div className={styles.veiculoList}>
          {veiculos.map(veiculo => (
            <div key={veiculo.id} className={styles.veiculoCard}>
              <h3>Modelo: {veiculo.modelo}</h3>
              <p>Cor: {veiculo.cor}</p>
              <p>Câmbio: {veiculo.cambio}</p>
              <p>Kit Roda ID: {veiculo.kitRodaId || 'N/A'}</p>
              <p>Status: {veiculo.status.replace('_', ' ')}</p>
              <p>Cadastrado em: {new Date(veiculo.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}