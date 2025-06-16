'use client';

import React from 'react';
import SelectRadio from '../SelectRadio';
import styles from './styles.module.css';

type AvaliacaoCriterioProps = {
    criterio: string;
    value: boolean | null;
    onChange: (value: boolean | null) => void;
    disabled?: boolean;
};

const AvaliacaoCriterio: React.FC<AvaliacaoCriterioProps> = ({ criterio, value, onChange, disabled }) => {
    
    return (
        <div className={styles.criterio}>
            <p className={styles.criterioNome}>{criterio}</p>
            <SelectRadio
                label={`Avaliar ${criterio}`}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};
export default AvaliacaoCriterio