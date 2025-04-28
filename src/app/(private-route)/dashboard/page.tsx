// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import "./styles.css";

export default function Dashboard() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push('/dashboard');
  // }, [])


  return (
    <div className="dashboard-container">
  <h1>Bem-vindo ao Sistema</h1>

  <div className="recentes">
    <h2>Atividades Recentes</h2>
  </div>

  <div>
    <h4>(Mostrar últimas alterações feitas no sistema)</h4>
  </div>

</div>
);
}
