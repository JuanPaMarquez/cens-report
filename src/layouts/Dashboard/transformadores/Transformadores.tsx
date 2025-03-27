import { useEffect, useState } from "react"
import useTransformadores from "../../../lib/store/CurrentTable"
import { GraphTransformadores } from "../../../lib/service/GraphTransformadores"
import GraphContainer from "./GraphContainer"

export default function Transformadores() {
  const { tableData, dataTime } = useTransformadores()
  const [ date, setDate ] = useState<string>("")
  const { graficas } = GraphTransformadores({ tableData })

  useEffect(() => {
    const currentDate = dataTime ? new Date(dataTime).toLocaleString() : "No hay datos"
    setDate(currentDate)
  }, [dataTime])

  return (
    <div>
      <h1 className="pb-2 font-bold text-center md:text-left">Ultima actualizacion: {date}</h1>
        <div id="table-graficas" className="w-full">
          { tableData.length > 0 
            // grid grid-flow-dense gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[100rem]:grid-cols-5 items-start
            ? <div className="grid grid-flow-dense gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[100rem]:grid-cols-5 items-start">
                {graficas.map((grafica) => (
                  <GraphContainer key={grafica.id} grafica={grafica} />
                ))}
              </div>
            : <div className="flex justify-center items-center">
                <h1 className="text-center ">No hay datos para mostrar, por favor carge la informacion en el boton <strong> Actualizar</strong>.</h1>  
              </div>
          }
        </div>
    </div>
  )
}