import TextField from "@mui/material/TextField";
import "./styles.css";

type InputsProps = {
  label: string;
  tamanho?: number;
  tipo?: string;
};

export default function EntryInput({ label, tipo, tamanho }: InputsProps) {
  return (
    <TextField
  id="custom-textarea"
  label={label}
  type={tipo}
  multiline
  rows={1}
  className="custom-textarea"
  sx={{ width: tamanho, m: '10px' }}
/>

  );
}
