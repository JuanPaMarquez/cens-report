import { useEffect, useState } from "react"
import { GraficasInterface } from "../../schemas/graphSchema"
import LinePlot from "../../components/graph/LinePlot"
import { GasesTabla } from "../../schemas/gasesSchema"
import { hidrogenoFechas } from "../helpers/gasesDatos"

export function GraphGases({ 
  tableGases, 
  idTransformadorGases 
}:{ 
  tableGases: GasesTabla[], 
  idTransformadorGases: string 
}){
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])
  
  useEffect(() => {
    setGraficas([
      {
        id: "contenido-humedad",
        title: "Contenido de Humedad",
        Component: LinePlot,
        data: hidrogenoFechas(tableGases, idTransformadorGases),
        color: "#2A9AC9",
        styles: "md:col-span-2",
      },
    ])
  }, [ tableGases, idTransformadorGases ])

  return { graficas }
}