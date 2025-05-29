'use client'
import Link from "next/link"
import styles from "./styles.module.css"
import { usePathname } from "next/navigation"
import { PiSealCheckBold } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { BiBox } from "react-icons/bi";
import { MdForklift } from "react-icons/md";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import logo from '@/assets/techSolutions.png'
import Image from 'next/image'

export default function NavMenu() {
    const pathName = usePathname();

    
    const itens = [
        {
            label: "Home",
            page: '/home',
            icon: <FaHome />
        },
        {
            label: "Manutenção",
            page: '/manutencao',
            icon: <HiMiniWrenchScrewdriver />
        },
        {
            label: "Produção",
            page: '/veiculo',
            icon: <MdForklift />
        },
        {
            label: "Estoque",
            page: '/produto',
            icon: <BiBox />
        },
        {
            label: "Qualidade",
            page: '/qualidade',
            icon: <PiSealCheckBold />
        },
    ]



    return (
        <div className={styles.container}>
            <div className={styles.logoArea}>
                <Image src={ logo } alt=""/>
        </div>
            <div className={styles.content}>
                {itens.map(item => (
                    <Link 
                        key={item.label} 
                        className={`item ${pathName === item.page ? styles.selected : ""}`}
                        href={item.page}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}