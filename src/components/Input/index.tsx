
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import "./styles.css"

type InputsProps = {
    text?: string;
    tamanho?: number;
    label?: string;
    
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

export default function Checkboxes() {
  return (
    <div>
      <Checkbox {...label} />
    </div>
  );
}