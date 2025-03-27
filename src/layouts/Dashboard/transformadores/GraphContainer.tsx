import { useState } from "react";
import { GraficasInterface } from "../../../lib/service/GraphTransformadores";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

export default function GraphContainer({ 
  grafica,
}: { 
  grafica: GraficasInterface,
}) {
  const { Component, data, title, styles } = grafica;
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad

  return (
    <div className={`pb-5 pt-2 px-2 rounded-md shadow-sm col-span-1 ${styles}`}>
      <div className="flex justify-between items-center p-1">
        <h1 className="text-center">{title}</h1>
        <button 
          onClick={() => setIsVisible(!isVisible)} // Alternar visibilidad
          className="cursor-pointer"
        >
          {isVisible ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {isVisible && ( // Mostrar el gráfico solo si isVisible es true
        <div className="flex justify-start items-center h-full">
          {data !== null ? <Component data={data} /> : <Component />}
        </div>
      )}
    </div>
  );
}