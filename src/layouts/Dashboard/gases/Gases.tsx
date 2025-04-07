import { useEffect, useState } from "react"
import { useGases } from "../../../lib/store/CurrentTable"
import { GraphGases } from "../../../lib/service/GraphGases"
import GraphContainer from "../../../components/ui/GraphContainer"
import { listarTransformadoresID } from "../../../lib/helpers/datos"
import SelectID from "../../../components/ui/Selects"

export default function Gases() {
  const { tableGases, gasesTime, setIdTransformadorGases, idTransformadorGases } = useGases()
  const [ date, setDate ] = useState<string>("")
  const { graficas } = GraphGases({ tableGases, idTransformadorGases })
  const transformadoresID = listarTransformadoresID(tableGases, "ID TR")

  useEffect(() => {
    const currentDate = gasesTime ? new Date(gasesTime).toLocaleString() : "No hay datos"
    setDate(currentDate)
  }, [gasesTime])

  return (
    <div className="w-full h-full">
      <h1 className="pb-2 font-bold text-center md:text-left">Ultima actualizacion: {date}</h1>
      <SelectID
        idTransformador={idTransformadorGases} 
        setIdTransformador={setIdTransformadorGases} 
        transformadoresID={transformadoresID.map(String)}
      />
      <div id="table-graficas" className="w-full">
        { tableGases.length > 0 
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