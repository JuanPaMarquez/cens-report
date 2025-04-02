import { useEffect, useState } from "react"
import { FisicoQuimicoTabla } from "../../schemas/fisicoQuimicoSchema"
import { GraficasInterface } from "../../schemas/graphSchema"
import LinePlot from "../../components/graph/LinePlot"
import { maxContHum } from "../helpers/fisicoQuimicoDatos"

export function GraphFisicoQuimico({ 
  tableFisicoQuimico, 
  idTransformador 
}:{ 
  tableFisicoQuimico: FisicoQuimicoTabla[], 
  idTransformador: string 
}){
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])
  
  useEffect(() => {
    setGraficas([
      {
        id: "contenido-humedad",
        title: "Contenido de Humedad",
        Component: LinePlot,
        data: maxContHum(tableFisicoQuimico, idTransformador),
        styles: "md:col-span-2",
      }
    ])
  }, [ tableFisicoQuimico, idTransformador ])

  return { graficas }
}