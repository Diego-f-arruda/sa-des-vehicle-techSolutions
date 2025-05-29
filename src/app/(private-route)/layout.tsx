"use client";

import NavMenu from "@/components/NavMenu";
import styles from './styles.module.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateLayout({ children }: { children: React.ReactNode}){
    const router = useRouter();
const [checkedAuth, setCheckedAuth] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log('Token lido no layout privado (useEffect):', token); 

        if (!token) {
            console.log('Token NÃO encontrado, redirecionando para /login...');
            router.push('/login');
        } else {
            console.log('Token encontrado, prosseguindo com autenticação.');
        }
        setCheckedAuth(true); 
    }, [router]); 

    if (!checkedAuth) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
                Verificando autenticação...
            </div>
        );
    }
    return (
        <div className={styles.layout} >
            <NavMenu />
            {children}
        </div>
    )
}
