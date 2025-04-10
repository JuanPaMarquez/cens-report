import CircleTotal from "../../components/graph/CircleTotal"
import BarHorizontal from "../../components/graph/BarHorizontal"
import BarPlotDouble from "../../components/graph/BarPlotDouble"
import TablePlot from "../../components/graph/TablePlot"
import { contarElementos } from "../helpers/datos"
import { 
  edadesTransformadores, 
  potenciaMaxima, 
  tableDataEstadosTipos, 
  tranformadoresMayores, 
  transformadoresEstado, 
  transformadoresFabricante, 
  transformadoresFabricanteEstado, 
  transformadoresMonitoreo, 
  transformadoresSubestacion 
} from "../helpers/transformadoresDatos"
import { useEffect, useState } from "react"
import { TransformadorTabla } from "../../schemas/transformadoresSchema"
import BarHorizontalMulti from "../../components/graph/BarHorizontalMulti"
import CirclePlot from "../../components/graph/CirclePlot"
import BarPlotColor from "../../components/graph/BarPlotColor"
import BarProp from "../../components/graph/BarPlot"
import { GraficasInterface } from "../../schemas/graphSchema"

export function GraphTransformadores({ tableTransformadores }: { tableTransformadores: TransformadorTabla[] }) {
  const [graficas, setGraficas] = useState<GraficasInterface[]>([])
  
  useEffect(() => {
    setGraficas([
      {
        id: "estados-transformadores",
        title: "Estados Transformadores",
        Component: BarHorizontal,
        data: contarElementos(tableTransformadores, "Estado"),
        styles: "md:col-span-2",
      },
      {
        id: "total-transformadores",
        title: "Total Transformadores",
        Component: CircleTotal,
        data: contarElementos(tableTransformadores, "Tipo de Aceite"),
      },
      {
        id: "potencia-maxima",
        title: "Potencia Maxima",
        Component: BarPlotDouble,
        data: potenciaMaxima( tableTransformadores, "Tipo de Aceite", "Estado", "Potencia Máxima" ),
        styles: "md:col-span-2"
      },
      {
        id: "tabla-potencia-maxima",
        title: "Potencia Maxima",
        Component: TablePlot,
        data: tableDataEstadosTipos(tableTransformadores, "Tipo de Aceite", "Estado"),
        styles: "md:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5"
      },
      {
        id: "transformadores-estados",
        title: "Transformadores por Estados",
        Component: BarPlotDouble,
        data: transformadoresEstado(tableTransformadores),
        styles: "md:col-span-2"
      },
      {
        id: "edades-transformadores",
        title: "Edades Transformadores",
        Component: CirclePlot,
        data: edadesTransformadores(tableTransformadores),
      },
      {
        id: "transformadores-mayores-subestacion",
        title: "Transformadores Mayores a 29 años",
        Component: BarPlotColor,
        data: tranformadoresMayores(tableTransformadores, "ID", "Subestacion"),
        styles: "md:col-span-2",
      },
      {
        id: "transformadores-mayores-estado",
        title: "Estados de los Transformadores Mayores a 29 años",
        Component: BarPlotColor,
        data: tranformadoresMayores(tableTransformadores, "ID", "Estado"),
        styles: "md:col-span-2",
      },
      {
        id: "transformadores-fabricante",
        title: "Transformadores por Fabricante",
        Component: BarProp,
        data: transformadoresFabricante(tableTransformadores),
        styles: "md:col-span-2"
      },
      {
        id: "transformadores-fabricante-disponible",
        title: "Transformadores por Fabricante Disponibles",
        Component: BarPlotDouble,
        data: transformadoresFabricanteEstado(tableTransformadores, "DISPONIBLE", "MINERAL", "VEGETAL"),
        styles: "md:col-span-2"
      },
      {
        id: "transformadores-fabricante-operacion",
        title: "Transformadores por Fabricante Operacion",
        Component: BarPlotDouble,
        data: transformadoresFabricanteEstado(tableTransformadores, "OPERACIÓN", "MINERAL", "VEGETAL"),
        styles: "md:col-span-2"
      },
      {
        id: "transformadores-subestacion-monitoreo",
        title: "Transformadores con Monitoreo en linea",
        Component: BarHorizontalMulti, 
        data: transformadoresMonitoreo(tableTransformadores),
        styles: "md:col-span-2"
      },
      {
        id: "transformadores-subestacion",
        title: "Transformadores por Subestación",
        Component: BarHorizontalMulti, 
        data: transformadoresSubestacion(tableTransformadores),
        styles: "md:col-span-2 "
      },
    ])
  }, [ tableTransformadores ])

  return { graficas }
}