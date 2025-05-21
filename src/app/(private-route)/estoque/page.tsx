'use client'

import Button from "@/components/Button";
import "./styles.css";
import EntryInput from "@/components/TextArea";


type Produto = {
  id: string;
  nome: string;
  qtd: number;
  cor: string;
  uso: "Interno" | "Externo";
  custo: number;
  dataEntrada: Date;
}

export default function Estoque() {
  return (
    <div className="estoque-container">
      <div className="form">
        <h2>Cadastro de Equipamentos Recebidos  </h2>

        {/* <Button text="Novo Produto" onClick={FormCadastro}/> */}
        <div className="inputs">
          <EntryInput label="Produto" tipo="text" tamanho={305} />
          <EntryInput label="Tipo" tipo="text" tamanho={305} />
          <EntryInput label="Marca" tipo="date" tamanho={305} />
          <EntryInput label="Quantidade" tipo="number" tamanho={305} />
          <Button text="Cadastrar" />
        </div>
      </div>
      <div className="footer">

        <h1>Lista de Produtos Cadastrados</h1>
        <div className="produto">
          <h1>Motor 1.0</h1>
          <h3>Peça</h3>
          <h3></h3>
        </div>
      </div>

    </div>
  );
}


