// src/components/Qualidade/SelectRadio/index.tsx
'use client';

import React from 'react';
// Removido InputLabel da importação, pois o Select vai gerenciar internamente
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'; 

type SelectRadioProps = {
    label?: string;
    value: boolean | null;
    onChange: (value: boolean | null) => void;
    disabled?: boolean;
};

const SelectRadio: React.FC<SelectRadioProps> = ({ label, value, onChange, disabled }) => {
    const displayValue = value === true ? 'true' : (value === false ? 'false' : '');

    console.log(`SelectRadio - Critério: ${label}, Valor Recebido (prop 'value'): ${value}, Valor Calculado (displayValue): '${displayValue}'`);

    return (
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <Select
                
                label={label} 
                value={displayValue}
                onChange={(e: SelectChangeEvent<string>) => {
                    //ira converter a string de volta para boolean | null
                    const newValue = e.target.value === 'true' ? true : (e.target.value === 'false' ? false : null);
                    onChange(newValue);
                }}
                displayEmpty 
                disabled={disabled}
            >
                <MenuItem value="">Não Avaliado</MenuItem>
                <MenuItem value="true">Aprovado</MenuItem>
                <MenuItem value="false">Reprovado</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectRadio;