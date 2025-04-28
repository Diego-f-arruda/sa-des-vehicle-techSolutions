import "./styles.css"
import React from 'react';



type ButtonProps = {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
}
export default function Button({disabled, text, onClick}: ButtonProps) {
    return (
        <button type="submit" className="button-custom" disabled = {disabled} onClick={onClick} > 
            {text}
        </button>

    )
}