import CircleTotal from "../components/graph/CircleTotal"
import BarHorizontal from "../components/graph/BarHorizontal"
import BarPlotDouble from "../components/graph/BarPlotDouble"
import useTableStore from "../service/CurrentTable"
import { contarElementos } from "../lib/datos"
import { useEffect, useState, useCallback } from "react"

export interface GraficasInterface {
  id: string
  title: string
  Component: React.ElementType
  data: Array<{ label: string, value: number }> 
    | Array<{ label: string, value1: number, value2: number }> 
    | null
  styles?: string
}

export function useGrafica() {
  const { tableData } = useTableStore()
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])

  const potenciaMaxima = useCallback(() => {
    let resul = null

    if (tableData) {
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
    }

    return resul
  }, [ tableData ])
  
  useEffect(() => {
    if (tableData) {
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
    }
  }, [ tableData, potenciaMaxima ])

  return { graficas }
}