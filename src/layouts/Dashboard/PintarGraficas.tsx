import CircleTotal from "../../components/graph/CircleTotal"
import BarHorizontal from "../../components/graph/BarHorizontal"
import useTableStore from "../../service/CurrentTable"
import { datosEstadoTransformadores, totalTransformadores } from "../../lib/datos"
import { useEffect, useState } from "react"

export default function PintarGraficas() {
  const { tableData } = useTableStore()
  const [ estados, setEstados ] = useState<Array<{ label: string, value: number }>>([])

  useEffect(() => {
    if (tableData) {
      const nuevosDatos = datosEstadoTransformadores(tableData)
      setEstados(nuevosDatos)
      console.log(totalTransformadores(tableData))
    }
  }, [tableData])
  
  
  return (
    <div className="grid grid-flow-dense gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[100rem]:grid-cols-5 place-content-center">
      <div 
        id="estados-transformadores" 
        className={`pb-5 pt-2 px-2 rounded-md shadow-md col-span-1 md:col-span-2`}>
        <h1 className="text-center">Estados Transformadores</h1>
        <div className="flex justify-start items-center h-full">
          <BarHorizontal data={estados} setMargin={{ top: 20, right: 40, bottom: 20, left: 130 }}/> 
        </div>
      </div>
      <div 
        id="estados-transformadores" 
        className={`pb-5 pt-2 px-2 rounded-md shadow-md col-span-1`}>
        <h1 className="text-center">Total Transformadores</h1>
        <div className="flex justify-start items-center h-full">
          <CircleTotal /> 
        </div>
      </div>
      {/* {data.map((item, index) => (
        <div key={index} className={`pb-5 pt-2 px-2 rounded-md shadow-md col-span-1 ${item % 2 !== 0 ? 'md:col-span-2' : ''}`}>
          <h1 className="text-center">Grafica {item}</h1>
          <div className="flex justify-start items-center h-full">
            {item % 2 !== 0? <BarHorizontal /> : <CirclePlot />}
          </div>
        </div>
      ))} */}
    </div>
  )
}