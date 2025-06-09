import TextField from "@mui/material/TextField";
import React, { ChangeEvent } from "react";
import "./styles.css";

type InputsProps = {
  label: string;
  name?: string;
  email?: string;
  password?: string;
  tamanho?: number;
  tipo?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
};

export default function EntryInput({ label, name, email, password, tipo, tamanho, value, onChange }: InputsProps) {
  return (
    <TextField
      id="custom-textarea"
      label={label}
      name={name}
      e-mail={email}
      password={password}
      type={tipo}
      multiline={tipo === 'text' || tipo === undefined}
      rows={1}
      className="custom-textarea"
      sx={{ width: tamanho, m: '10px' }}
      value={value}
      onChange={onChange}
    />

  );
}
