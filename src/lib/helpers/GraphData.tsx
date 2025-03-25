import CircleTotal from "../../components/graph/CircleTotal"
import BarHorizontal from "../../components/graph/BarHorizontal"
import BarPlotDouble from "../../components/graph/BarPlotDouble"
import { contarElementos } from "./datos"
import { useEffect, useState, useCallback } from "react"
import { TransformadorTabla } from "../../schemas/transformadoresSchema"

export interface GraficasInterface {
  id: string // Identificador único
  title: string // Título de la gráfica
  Component: React.ElementType // Componente de la gráfica a renderizar
  data:
      Array<{ label: string, value: number }> // Datos de la gráfica
    | Array<{ label: string, value1: number, value2: number }>  // Datos de la gráfica para doble barra
    | null
  styles?: string // Estilos adicionales
}

export function GraphData({ tableData }: { tableData: TransformadorTabla[] }) {
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])

  const potenciaMaxima = useCallback(() => {
    let resul = null

    const tipos = contarElementos(tableData, "Tipo de Aceite")
    const estados = contarElementos(tableData, "Estado")

    // const potenciaMaxima = tipos.map((tipo) => {
    //   const potencia = tableData.filter((item) => item["Tipo de Aceite"] === tipo.label)
    //   const suma = potencia.reduce((acc, item) => {
    //     return acc + parseFloat(item["Potencia Máxima"].toString())
    //   }, 0)
    //   return { label: tipo.label, value: suma }
    // })

    // const potenciaMaximaEstados = estados.map((estado) => {
    //   const potencia = tableData.filter((item) => item["Estado"] === estado.label)
    //   const suma = potencia.reduce((acc, item) => {
    //     return acc + parseFloat(item["Potencia Máxima"].toString())
    //   }, 0)
    //   return { label: estado.label, value: suma }
    // })

    const potenciaEstadosTipo = estados.map((estado) => {
      const potencia = tipos.map((tipo) => {
        const potencia = tableData.filter((item) => item["Estado"] === estado.label && item["Tipo de Aceite"] === tipo.label)
        const suma = potencia.reduce((acc, item) => {
          return acc + parseFloat(item["Potencia Máxima"].toString())
        }, 0)
        return { label: tipo.label, value: suma }
      })
      return { label: estado.label, value1: potencia[0].value, value2: potencia[1].value }
    })

    resul = potenciaEstadosTipo

    return resul
  }, [ tableData ])
  
  useEffect(() => {
    setGraficas([
      {
        id: "estados-transformadores",
        title: "Estados Transformadores",
        Component: BarHorizontal,
        data: contarElementos(tableData, "Estado"),
        styles: "md:col-span-2",
      },
      {
        id: "total-transformadores",
        title: "Total Transformadores",
        Component: CircleTotal,
        data: contarElementos(tableData, "Tipo de Aceite"),
        styles: "max-w-65"
      },
      {
        id: "potencia-maxima",
        title: "Potencia Maxima",
        Component: BarPlotDouble,
        data: potenciaMaxima(),
        styles: "md:col-span-2"
      }
    ])
  }, [ tableData, potenciaMaxima ])

  return { graficas }
}