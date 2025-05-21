import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import EntryInput from "../TextArea";
import React from "react";
import styles from './styles.module.css';


export default function FormCadastro() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Cadastrar novo carro
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Cadastrar</DialogTitle>
                <DialogContent className={styles.inputs}>
                    <DialogContentText>
                        Insira as informações do novo carro
                    </DialogContentText >
                    <EntryInput label="Modelo" tipo="text" tamanho={450} />
                    <EntryInput label="Uso" tipo="text" tamanho={150} />
                    <EntryInput label="Quantidade" tipo="number" tamanho={100} />
                    <EntryInput label="Custo" tipo="number" tamanho={200} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Cadastrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
