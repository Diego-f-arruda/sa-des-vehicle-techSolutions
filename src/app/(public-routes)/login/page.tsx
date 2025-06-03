"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css"
import { useState } from "react";
import axios from "axios";
import fundo from '@/assets/capa.jpg';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const disabledButton = !email;

  const router = useRouter();

  async function handleSubmit() {
    try {
      const loginUrl = "http://localhost:3333/login";

      const response = await axios.post(loginUrl, {
        email, password
      });

      localStorage.setItem('access_token', response.data.access_token)
      router.push('/produto')
    } catch {
      alert("Erro ao fazer login")
    }
  }

  return (
    
      <div className={styles.container}>
        <div className={styles.form}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="E-mail"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={disabledButton}
          >
            Entrar
          </button>
          <p>Ainda não é cadastrado?    <button type="submit">Cadastre-se</button></p>
        </div>
      </div>
    
  );
}
