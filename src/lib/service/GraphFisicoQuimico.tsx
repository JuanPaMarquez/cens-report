import { useEffect, useState } from "react"
import { FisicoQuimicoTabla } from "../../schemas/fisicoQuimicoSchema"
import { GraficasInterface } from "../../schemas/graphSchema"
import LinePlot from "../../components/graph/LinePlot2"

export function GraphFisicoQuimico({ tableFisicoQuimico }: { tableFisicoQuimico: FisicoQuimicoTabla[] }) {
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])
  
  useEffect(() => {
    setGraficas([
      {
        id: "contenido-humedad",
        title: "Contenido de Humedad",
        Component: LinePlot,
        // data: contarElementos(tableTransformadores, "Estado"),
        styles: "md:col-span-2",
      }
    ])
  }, [ tableFisicoQuimico ])

  return { graficas }
}