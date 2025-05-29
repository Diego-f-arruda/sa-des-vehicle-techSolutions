'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import EntryInput from '@/components/TextArea'; 
import styles from './styles.module.css';
import {  FormControl, InputLabel, Select, MenuItem} from '@mui/material';

enum TipoAcessorioEnum {
  PECA = 'PECA',
  ELETRONICO = 'ELETRONICO',
  ACABAMENTO = 'ACABAMENTO',
  KIT_RODA = 'KIT_RODA',
}


type Produto = {
  id: string;
  nome: string;
  tipo: TipoAcessorioEnum; 
  quantidade: number;
  createdAt: string; 
  updatedAt: string; 
};

export default function ProdutoPage() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<TipoAcessorioEnum>(TipoAcessorioEnum.PECA); 
  const [quantidade, setQuantidade] = useState<number | ''>(''); 

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const API_URL = 'http://localhost:3333/produto'; 

  
  const buscaProdutos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

      const response = await axios.get<Produto[]>(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProdutos(response.data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Falha ao carregar produtos.');
      } else {
        setError('Falha ao carregar produtos. Verifique a conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    buscaProdutos();
  }, []);

  // Função para o envio do formulario de cadastro
  const handleCadastrarProduto = async () => {
    setFormSubmitting(true);
    setError(null);
    try {
      
      if (!nome || quantidade === '' || quantidade <= 0) {
        throw new Error('Por favor, preencha o nome e uma quantidade válida.');
      }

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

      const novoProduto: Omit<Produto, 'id' | 'createdAt' | 'updatedAt'> = {
        nome,
        tipo,
        quantidade: Number(quantidade), 
      };

      await axios.post(API_URL, novoProduto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Produto cadastrado com sucesso!');
      
      setNome('');
      setTipo(TipoAcessorioEnum.PECA);
      setQuantidade('');

      
      buscaProdutos();
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Falha ao cadastrar produto.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Falha ao cadastrar produto.');
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Cadastro de Equipamentos Recebidos</h2>

        <div className={styles.inputs}>
          
          <EntryInput
            label="Nome do Produto"
            tipo="text"
            tamanho={305}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <FormControl sx={{ width: 305, marginBottom: '10px' }} variant="outlined">
            <InputLabel id="tipo-acessorio-label">Tipo de Acessório</InputLabel>
            <Select
              labelId="tipo-acessorio-label"
              value={tipo}
              label="Tipo de Acessório" 
              onChange={(e) => setTipo(e.target.value as TipoAcessorioEnum)}
              className={styles.selectLabel} 
            >
              {Object.values(TipoAcessorioEnum).map((option) => (
                <MenuItem key={option} value={option}>
                  {option === 'KIT_RODA'
                    ? 'Kit Rodas'
                    : option.charAt(0).toUpperCase() +
                      option.slice(1).toLowerCase().replace('_', ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <EntryInput
            label="Quantidade"
            tipo="number"
            tamanho={305}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />

          <Button text={formSubmitting ? 'Cadastrando...' : 'Cadastrar'} onClick={handleCadastrarProduto} disabled={formSubmitting} />
        </div>
      </div>

      <div className={styles.footer}>
        <h1>Lista de Produtos Cadastrados</h1>

        {error && <p className={styles.errorMessage}>Erro: {error}</p>}
        {loading ? (
          <p>Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum produto cadastrado ainda.</p>
        ) : (
          <div className={styles.productList}>
            {produtos.map((produto) => (
              <div key={produto.id} className={styles.produtoCard}>
                <h3>{produto.nome}</h3>
                <p>Tipo: {produto.tipo.replace('_', ' ')}</p>
                <p>Quantidade: {produto.quantidade}</p>
                <p>Criado em: {new Date(produto.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}