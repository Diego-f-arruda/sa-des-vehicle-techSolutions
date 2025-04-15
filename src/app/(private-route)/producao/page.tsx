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
                    <h1>aaaaaaaaaaaaaaaaaaa</h1>
                    <h1>aaaaaaaaaaaaaaaaaaa</h1>
                    
                </div>
                <div className='produtos'>
                    <h1>aaaaaaaaaaaaaaaaaaa</h1>
                    <h1>aaaaaaaaaaaaaaaaaaa</h1>
                    
                </div>
                <div className='produtos'>
                    <h1>aaaaaaaaaaaaaaaaaaa</h1>
                    <h1>aaaaaaaaaaaaaaaaaaa</h1>
                    
                </div>
        </div>
    )
}