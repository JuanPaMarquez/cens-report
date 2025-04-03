import { useEffect, useState } from "react"
import { GraficasInterface } from "../../schemas/graphSchema"
import LinePlot from "../../components/graph/LinePlot"
import { GasesTabla } from "../../schemas/gasesSchema"
import { maxContData } from "../helpers/datos"

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
        id: "hidrogeno",
        title: "Hidrogeno",
        Component: LinePlot,
        // data: datosFechas(tableGases, idTransformadorGases, "Hidrogeno (H2)"),
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Hidrogeno (H2)"),
        color: "#81816C",
        styles: "md:col-span-2",
      },
      {
        id: "metano",
        title: "Metano",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Metano (CH4)"),
        color: "#A12D14",
        styles: "md:col-span-2",
      },
      {
        id: "etano",
        title: "Etano",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Etano (C2H6)"),
        color: "#510272",
        styles: "md:col-span-2",
      },
      {
        id: "etileno",
        title: "Etileno",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Etileno (C2H4)"),
        color: "#18438C",
        styles: "md:col-span-2",
      },
      {
        id: "acetileno",
        title: "Acetileno",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Acetileno (C2H2)"),
        color: "#005AFF",
        styles: "md:col-span-2",
      },
      {
        id: "monoxido-carbono",
        title: "Monoxido de Carbono",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Monoxido de Carbono (CO)"),
        color: "#822B10",
        styles: "md:col-span-2",
      },
      {
        id: "dioxido-carbono",
        title: "Dioxido de Carbono",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "Dioxido de Carbono (CO2)"),
        color: "#766F6D",
        styles: "md:col-span-2",
      },
      {
        id: "total-tdcg",
        title: "Total TDCG",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "TOTAL (TDCG)"),
        color: "#1EB595",
        styles: "md:col-span-2",
      },
      {
        id: "oxigeno",
        title: "Oxigeno",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "OXIGENO"),
        color: "#D9B74F",
        styles: "md:col-span-2",
      },
      {
        id: "nitrogeno",
        title: "Nitrogeno",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "NITROGENO"),
        color: "#2A9AC9",
        styles: "md:col-span-2",
      },
      {
        id: "relacion-o2-n2",
        title: "Relacion O2/N2",
        Component: LinePlot,
        data: maxContData(tableGases, idTransformadorGases, "ID TR", "FECHA MUEST", "(O2/N2)"),
        color: "#000000",
        styles: "md:col-span-2",
      },
    ])
  }, [ tableGases, idTransformadorGases ])

  return { graficas }
}