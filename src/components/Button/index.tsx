import "./styles.css"
import React from 'react';


type ButtonProps = {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export default function Button({disabled, onClick}: ButtonProps) {
    return (
        <button type="submit" className="button-custom" disabled = {disabled} onClick={onClick}> 
            Enviar
        </button>

    )
}