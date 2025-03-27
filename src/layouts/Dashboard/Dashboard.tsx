import { useEffect, useState } from "react";
import { useNavigate, useOutlet } from "react-router";


export default function Dashboard() {
  const navegar = useNavigate();
  const outlet = useOutlet();
  const [selected, setSelected] = useState("transformadores");

  useEffect(() => {
    navegar(`/dashboard/${selected}`);
  },[selected, navegar]);
  
  return (
    <div className="w-full h-full md:p-3 flex flex-col items-center">
      <select 
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className=" rounded-md border border-gray-300 shadow-sm m-1"
      >
        <option value="transformadores">Analisis Transformadores</option>
        <option value="fisico-quimico">Analisis Fisico Quimico</option>
        <option value="gases">Analisis de Gases</option>
        <option value="inhibidor">Analisis Inhibidor</option>
        <option value="furanos">Analisis Furanos</option>
      </select>
      {outlet ? outlet : <h1>Dashboard</h1>}
    </div>
  )
}