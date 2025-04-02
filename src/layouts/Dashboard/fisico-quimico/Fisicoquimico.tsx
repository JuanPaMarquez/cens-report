import { useEffect, useState } from "react"
import { useFisicoQuimico } from "../../../lib/store/CurrentTable"
import { GraphFisicoQuimico } from "../../../lib/service/GraphFisicoQuimico"
import GraphContainer from "../../../components/ui/GraphContainer"

export default function Fisicoquimico() {
  const { fisicoQuimicoTime, tableFisicoQuimico } = useFisicoQuimico()
  const [ date, setDate ] = useState<string>("")
  const { graficas } = GraphFisicoQuimico({ tableFisicoQuimico })

  useEffect(() => {
    const currentDate = fisicoQuimicoTime ? new Date(fisicoQuimicoTime).toLocaleString() : "No hay datos"
    setDate(currentDate)
  }, [fisicoQuimicoTime])
  
  return (
    <div className="w-full h-full">
      <h1 className="pb-2 font-bold text-center md:text-left">Ultima actualizacion: {date}</h1>
      <div id="table-graficas" className="w-full">
        { tableFisicoQuimico.length > 0 
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