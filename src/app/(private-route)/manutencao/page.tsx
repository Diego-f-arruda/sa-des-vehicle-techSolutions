'use client'
import { ComboBox } from '@/components/Input'
import './styles.css'

export default function Manutencao() {
    return (
        <div className='container'>
        <div className='form'>
            <ComboBox label='veiculo' tamanho={900} handle={() => {}}  />
            <ComboBox label='Quantidade' tamanho={200} handle={() => {}}  />
            <ComboBox label='vcbweri' tamanho={100} handle={() => {}}  />
            <ComboBox label='vnueoirqnvoqw' tamanho={800} handle={() => {}}  />
        </div>

        </div>
    )
}