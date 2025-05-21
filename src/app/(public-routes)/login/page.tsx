"use client";
import { useRouter } from "next/navigation";
import "./styles.css";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const disabledButton = !email;

  const router = useRouter();

  async function handleSubmit() {
    try{
      const response = await axios.post("http://localhost:3333/user/login", {
        email, password
    });

        localStorage.setItem('access_token', response.data.access_token)
        router.push('/dashboard')
    } catch {
        alert("Erro ao fazer login")
    }
}

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="E-mail"
          className="input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          className="button"
          onClick={handleSubmit}
          disabled={disabledButton}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
