'use client'

import './styles.css'
import FormCadastro from '@/components/FormCadastro'

export default function Producao() {
    return (

        <div className='producao-container'>
            <div className='input'>
                
                <FormCadastro/>
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