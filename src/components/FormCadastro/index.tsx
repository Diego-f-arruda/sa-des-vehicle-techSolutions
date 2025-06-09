import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import EntryInput from "../TextArea";
import React, { ChangeEvent } from "react";
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
                        Insira as informações do novo Usuario
                    </DialogContentText >
                    <TextField label="Nome" variant="outlined" onChange={e}/>
                    <TextField label="E-mail" variant="outlined" />
                    <TextField label="Password" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Cadastrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
