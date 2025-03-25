import CircleTotal from "../../components/graph/CircleTotal"
import BarHorizontal from "../../components/graph/BarHorizontal"
import BarPlotDouble from "../../components/graph/BarPlotDouble"
import TablePlot from "../../components/graph/TablePlot"
import { contarElementos } from "./datos"
import { potenciaMaxima, tableDataEstadosTipos, transformadoresEstado, transformadoresSubestacion } from "./especificData"
import { useEffect, useState } from "react"
import { TransformadorTabla } from "../../schemas/transformadoresSchema"
import BarHorizontalMulti from "../../components/graph/BarHorizontalMulti"

export interface GraficasInterface {
  id: string // Identificador de la grafica
  title: string // Título de la gráfica
  Component: React.ElementType // Componente de la gráfica a renderizar
  data?:
      Array<{ label: string, value: number }> // Datos de la gráfica
    | Array<{ label: string, value1: number, value2: number }>  // Datos de la gráfica para doble barra
    | Array<{ tipo: string; estados: { estado: string; suma: number; }[]; }> // Datos para generar la tabla
    | Array<{ category: string; values: { label: string; value: number; }[]; }>
    | null
  styles?: string // Estilos adicionales
}

export function GraphData({ tableData }: { tableData: TransformadorTabla[] }) {
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])
  
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
        data: potenciaMaxima( tableData, "Tipo de Aceite", "Estado", "Potencia Máxima" ),
        styles: "md:col-span-2"
      },
      {
        id: "tabla-potencia-maxima",
        title: "Potencia Maxima",
        Component: TablePlot,
        data: tableDataEstadosTipos(tableData, "Tipo de Aceite", "Estado"),
        styles: "md:col-span-2 lg:col-span-3"
      },
      {
        id: "transformadores-estados",
        title: "Transformadores por Estados",
        Component: BarPlotDouble,
        data: transformadoresEstado(tableData),
        styles: "md:col-span-2"
      },
      {
        id: "transformadores-subestacion",
        title: "Transformadores por Subestación",
        Component: BarHorizontalMulti,
        data: transformadoresSubestacion(tableData),
        styles: "md:col-span-2"
      },
    ])
  }, [ tableData ])

  return { graficas }
}