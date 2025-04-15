
import Button from "@/components/Button";
import "./styles.css";

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
          <input type="text" placeholder="Produto" required />
          <input type="number" placeholder="Quantidade" required />
          <input type="color" placeholder="Cor" />
          <select> <option>Interna</option> <option>Externa</option></select>
          <input type="number" placeholder="Custo" />
          <label> Data de Entrada</label>
          <input type="date" placeholder="Data de Entrada" />
          <Button/>
        </div>
      </div>
      <footer>
        <h1>Lista de Produtos Cadastrados</h1>
      </footer>
    </div>
  );
}


