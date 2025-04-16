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
      id="outlined-number"
      label={label}
      type={tipo}
      sx={{ width: tamanho }}
    />
  );
}
