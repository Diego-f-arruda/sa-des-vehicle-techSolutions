
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
        <h2>Cadastro de Equipamentos Recebidos</h2>
        <div className="inputs">
          <EntryInput label="Produto" tipo="text" tamanho={900} />
          <EntryInput label="Quantidade" tipo="number" tamanho={305} />
          <EntryInput label="Custo" tipo="text" tamanho={305} />
          <label> Data de Entrada</label>
          <EntryInput label="Data de Entrada" tipo="date" tamanho={305} />          
          <Button/>
        </div>
      </div>
      <footer>
        <h1>Lista de Produtos Cadastrados</h1>
      </footer>
    </div>
  );
}


