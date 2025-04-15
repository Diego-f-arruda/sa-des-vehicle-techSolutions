
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import "./styles.css"

type InputsProps = {
    text?: string;
    tamanho?: number;
    label?: string;
    tipo?: string;
    handle: () => void;
}

const optionsVetor = ["Cruze Vermelho", "Fusion Preto"]

export function ComboBox({tamanho, label}: InputsProps) {
    return (
        
        
        <Autocomplete
        disablePortal
        options={optionsVetor}
        sx={{ width: {tamanho} }}
        renderInput={(params) => <TextField {...params} label={label} />}
    />
    );
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function Checkboxes() {
  return (
    <div>
      <Checkbox {...label} />
    </div>
  );
}

export function inputText({label, tamanho}: InputsProps){
  return(
    <TextField label={label} variant="outlined" sx={{ width: {tamanho} }} />
  )
}

export function inputNumber({label, tamanho, tipo}: InputsProps){
  return(
    <TextField id="outlined-number" label={label} type={tipo} sx={{ width: {tamanho} }}/>
  )
}
