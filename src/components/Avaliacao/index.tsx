import SelectRadio from '@/components/SelectRadio';
import './styles.css'

export default function Qualidade() {
    return (
                <div className='avaliacao-container'>
                    <h1>Qualidade do Veículo</h1>
                    <p>Por favor, avalie a qualidade dos seguintes aspectos do veículo:</p>
        
                    <div className='criterios-container'>
                        <div className='criterio'>
                            <p>Motor</p>
                            <SelectRadio/>
                        </div>
        
                        <div className='criterio'>
                            <p>Pintura</p>
                            <SelectRadio/>
                        </div>
        
                        <div className='criterio'>
                            <p>Acabamento Interno</p>
                            <SelectRadio/>
                        </div>

                        <div className="criterio">
                            <p>Fluidos</p>
                            <SelectRadio/>
                        </div>

                        <div className="criterio">
                            <p>Opcionais</p>
                            <SelectRadio/>
                        </div>
                    </div>
        
                    <div className='comentario-container'>
                        <p>Deixe um comentário:</p>
                        <textarea name="comentario" placeholder="Escreva aqui..."></textarea>
                    </div>
                    
                    <div className='botao-container'>
                        <button type="submit">Enviar Avaliação</button>
                    </div>
                </div>
            );
        }