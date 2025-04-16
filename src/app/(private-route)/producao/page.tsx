import Button from '@/components/Button'
import './styles.css'

export default function Producao() {
    return (

        <div className='producao-container'>
            <div className='input'>
                <input type="text" id="" placeholder=' Modelo do carro'></input>
                <select name="" id="" >
                    <option value="" disabled>Selecione a cor</option>
                    <option value="" >2 portas</option>
                    <option value="">4 portas</option>
                </select>
                <select name="" id="">
                    <option value="" disabled>Câmbio</option>
                    <option value="">Câmbio Manual</option>
                    <option value="">Câmbio Automático</option>
                </select>
                <Button/>
            </div>
                <p id='paragrafo'>Carros cadastrados anteriormente</p>

                <div className='produtos'>
                    <h1>Celta</h1>
                    <h3>4 portas</h3>
                    <h3>Câmbio Automático</h3>
                    
                </div>
                <div className='produtos'>
                    <h1>Palio</h1>
                    <h3>2 portas</h3>
                    <h3>Câmbio Automático</h3>
                    
                </div>
                <div className='produtos'>
                    <h1>Opala</h1>
                    <h3>4 portas</h3>
                    <h3>Câmbio Manual</h3>
                    
                </div>
        </div>
    )
}