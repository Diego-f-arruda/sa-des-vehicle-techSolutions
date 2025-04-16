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
                            <div className='stars'>
                                <input type="radio" id="motor5" name="motor" value="5" /><label htmlFor="motor5">★</label>
                                <input type="radio" id="motor4" name="motor" value="4" /><label htmlFor="motor4">★</label>
                                <input type="radio" id="motor3" name="motor" value="3" /><label htmlFor="motor3">★</label>
                                <input type="radio" id="motor2" name="motor" value="2" /><label htmlFor="motor2">★</label>
                                <input type="radio" id="motor1" name="motor" value="1" /><label htmlFor="motor1">★</label>
                            </div>
                        </div>
        
                        <div className='criterio'>
                            <p>Pintura</p>
                            <div className='stars'>
                                <input type="radio" id="pintura5" name="pintura" value="5" /><label htmlFor="pintura5">★</label>
                                <input type="radio" id="pintura4" name="pintura" value="4" /><label htmlFor="pintura4">★</label>
                                <input type="radio" id="pintura3" name="pintura" value="3" /><label htmlFor="pintura3">★</label>
                                <input type="radio" id="pintura2" name="pintura" value="2" /><label htmlFor="pintura2">★</label>
                                <input type="radio" id="pintura1" name="pintura" value="1" /><label htmlFor="pintura1">★</label>
                            </div>
                        </div>
        
                        <div className='criterio'>
                            <p>Acabamento Interno</p>
                            <div className='stars'>
                                <input type="radio" id="acabamento5" name="acabamento" value="5" /><label htmlFor="acabamento5">★</label>
                                <input type="radio" id="acabamento4" name="acabamento" value="4" /><label htmlFor="acabamento4">★</label>
                                <input type="radio" id="acabamento3" name="acabamento" value="3" /><label htmlFor="acabamento3">★</label>
                                <input type="radio" id="acabamento2" name="acabamento" value="2" /><label htmlFor="acabamento2">★</label>
                                <input type="radio" id="acabamento1" name="acabamento" value="1" /><label htmlFor="acabamento1">★</label>
                            </div>
                        </div>

                        <div className="criterio">
                            <p>Fluidos</p>
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