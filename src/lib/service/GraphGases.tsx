import { useEffect, useState } from "react"
import { GraficasInterface } from "../../schemas/graphSchema"
import LinePlot from "../../components/graph/LinePlot"
import { GasesTabla } from "../../schemas/gasesSchema"
import { datosFechas } from "../helpers/gasesDatos"

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
        data: datosFechas(tableGases, idTransformadorGases, "Hidrogeno (H2)"),
        color: "#81816C",
        styles: "md:col-span-2",
      },
      {
        id: "metano",
        title: "Metano",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "Metano (CH4)"),
        color: "#A12D14",
        styles: "md:col-span-2",
      },
      {
        id: "etano",
        title: "Etano",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "Etano (C2H6)"),
        color: "#510272",
        styles: "md:col-span-2",
      },
      {
        id: "etileno",
        title: "Etileno",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "Etileno (C2H4)"),
        color: "#18438C",
        styles: "md:col-span-2",
      },
      {
        id: "acetileno",
        title: "Acetileno",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "Acetileno (C2H2)"),
        color: "#005AFF",
        styles: "md:col-span-2",
      },
      {
        id: "monoxido-carbono",
        title: "Monoxido de Carbono",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "Monoxido de Carbono (CO)"),
        color: "#822B10",
        styles: "md:col-span-2",
      },
      {
        id: "dioxido-carbono",
        title: "Dioxido de Carbono",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "Dioxido de Carbono (CO2)"),
        color: "#766F6D",
        styles: "md:col-span-2",
      },
      {
        id: "total-tdcg",
        title: "Total TDCG",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "TOTAL (TDCG)"),
        color: "#1EB595",
        styles: "md:col-span-2",
      },
      {
        id: "oxigeno",
        title: "Oxigeno",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "OXIGENO"),
        color: "#D9B74F",
        styles: "md:col-span-2",
      },
      {
        id: "nitrogeno",
        title: "Nitrogeno",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "NITROGENO"),
        color: "#2A9AC9",
        styles: "md:col-span-2",
      },
      {
        id: "relacion-o2-n2",
        title: "Relacion O2/N2",
        Component: LinePlot,
        data: datosFechas(tableGases, idTransformadorGases, "(O2/N2)"),
        color: "#000000",
        styles: "md:col-span-2",
      },
    ])
  }, [ tableGases, idTransformadorGases ])

  return { graficas }
}