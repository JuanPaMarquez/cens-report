import { useEffect, useState } from "react"
import { FisicoQuimicoTabla } from "../../schemas/fisicoQuimicoSchema"
import { GraficasInterface } from "../../schemas/graphSchema"
import LinePlot from "../../components/graph/LinePlot"
import { generarDatosCorrosivos, muestrasEjecutadas } from "../helpers/fisicoQuimicoDatos"
import { maxContData } from "../helpers/datos"
import BarPlotMulti from "../../components/graph/BarPlotMulti"

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
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "CONT. HUM"),
        color: "#2A9AC9",
        styles: "md:col-span-2",
      },
      {
        id: "rigidez-dielectrica",
        title: "Rigidez Dielectrica",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "RIGIDEZ DIELECT"),
        color: "#DE892F",
        styles: "md:col-span-2",
      },
      {
        id: "tension-interfacial",
        title: "Tension Interfacial",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "TENSION INTERFACIAL"),
        color: "#B62FDE",
        styles: "md:col-span-2",
      },
      {
        id: "numero-acido",
        title: "Numero de Acido",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "NUM. ÁCIDO"),
        color: "#955B18",
        styles: "md:col-span-2",
      },
      {
        id: "indice-color",
        title: "Indice Colometrico",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "IND. COLOR"),
        color: "#013F88",
        styles: "md:col-span-2",
      },
      {
        id: "factor-potencia",
        title: "Factor de Potencia",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "FACTOR POT"),
        color: "#1AA700",
        styles: "md:col-span-2",
      },
      {
        id: "densidad-relativa",
        title: "Densidad Relativa",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "DESIDAD RELATIVA"),
        color: "#D1CF16",
        styles: "md:col-span-2",
      },
      {
        id: "indice-calidad",
        title: "Indice de Calidad",
        Component: LinePlot,
        data: maxContData(tableFisicoQuimico, idTransformador, "ID TRAFO", "FECHA MUESTRA", "INDICE CALIDAD"),
        color: "#2A9AC9",
        styles: "md:col-span-2",
      },
      {
        id: "asufre-corrosivo",
        title: "Asufre Corrosivo",
        Component: LinePlot,
        data: generarDatosCorrosivos(tableFisicoQuimico, idTransformador),
        color: "#888700",
        styles: "md:col-span-2",
      },
      {
        id: "cantidad-muestras",
        title: "Cantidad de Muestras Ejecutadas",
        Component: BarPlotMulti,
        data: muestrasEjecutadas(tableFisicoQuimico),
        color: "#2A9AC9",
        styles: "md:col-span-2",
      },
    ])
  }, [ tableFisicoQuimico, idTransformador ])
  
  return { graficas }
}