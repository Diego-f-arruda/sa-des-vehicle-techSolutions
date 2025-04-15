'use client'
import { ComboBox } from '@/components/Input'
import './styles.css'

type Ordem = {
    id: string;
    titulo: string;
    detalhes: string;
};
const ordensDeServico: Ordem[] = [
    { id: "1", titulo: 'Ordem #1', detalhes: 'Troca de óleo e filtros.' },
    { id: "2", titulo: 'Ordem #2', detalhes: 'Revisão dos freios.' },
    { id: "3", titulo: 'Ordem #3', detalhes: 'Alinhamento e balanceamento.' },
];

export default function Manutencao() {
    return (
        <div className="manutencao-container">



            export default function TelaOrdensServico() {
  const [ordemSelecionada, setOrdemSelecionada] = useState<Ordem | null>(null);

            return (
            <div className="container">
                <div className="sidebar">
                    <div className="vertical-title">Lista de Ordens de serviço</div>
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
        </div>

    )
}