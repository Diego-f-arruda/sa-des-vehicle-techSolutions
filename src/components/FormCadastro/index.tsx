'use client'

import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import EntryInput from "../TextArea";
import React, { ChangeEvent, useState } from "react";
import styles from './styles.module.css';




export default function FormCadastro() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
        setMessage(null)
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
        setMessage(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);


        if (!name || !email || !password) {
            setMessage({ type: "error", text: "Por favor, Preencha os campos corretamente" });
            setLoading(false);
            return
        }
        if (!email.includes('@') && !email.includes('.com')) {
            setMessage({ type: "error", text: "Por favor, insira um email valido" });
            setLoading(false)
            return
        }

        try {
            const response = await fetch("http://localhost:3333/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao cadastrar usuario!!!")
            }

            setMessage({ type: "success", text: "Usuario cadastrado com sucesso!!!" })
            handleClose();
        } catch (error: any) {
            setMessage({ type: 'error', text: `Erro: ${error.message}` });
            console.error('Erro ao cadastrar usuário:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Cadastrar novo Usuario
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit
                    },
                }}
            >
                <DialogTitle>Cadastrar</DialogTitle>
                <DialogContent className={styles.inputs}>
                    <DialogContentText>
                        Insira as informações do novo Usuario
                    </DialogContentText >
                    <TextField 
                    label="Nome" 
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    disabled={loading}
                    />
                    
                    <TextField 
                    label="E-mail" 
                    variant="outlined" 
                    fullWidth
                    margin="dense"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    disabled={loading}
                    />
                    
                    <TextField 
                    label="Password" 
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    disabled={loading}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Cadastrar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
