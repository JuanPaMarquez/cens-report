import { useEffect, useState } from "react"
import { useTransformadores } from "../../../lib/store/CurrentTable"
import { GraphTransformadores } from "../../../lib/service/GraphTransformadores"
import GraphContainer from "../../../components/ui/GraphContainer"
import { listarTransformadoresIDNumber } from "../../../lib/helpers/datos"
import SelectID from "../../../components/ui/Selects"
import VerTransformador from "./VerTransformador"

export default function Transformadores() {
  const { tableTransformadores, transformadoresTime, setIdTransformador, idTransformador } = useTransformadores()
  const [ date, setDate ] = useState<string>("")
  const { graficas } = GraphTransformadores({ tableTransformadores })
  const transformadoresID = listarTransformadoresIDNumber(tableTransformadores, "TR")

  useEffect(() => {
    const currentDate = transformadoresTime ? new Date(transformadoresTime).toLocaleString() : "No hay datos"
    setDate(currentDate)
  }, [transformadoresTime])


  if (tableTransformadores.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-center ">No hay datos para mostrar, por favor carge la informacion en el boton <strong> Actualizar</strong>.</h1>  
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <h1 className="pb-2 font-bold text-center md:text-left">Ultima actualizacion: {date}</h1>
      <SelectID 
        idTransformador={idTransformador} 
        setIdTransformador={setIdTransformador} 
        transformadoresID={transformadoresID.map(String)}
      />
      <div id="table-graficas" className="w-full">
        { idTransformador === ""
          ? <div className="grid grid-flow-dense gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[100rem]:grid-cols-5 items-start">
              {graficas.map((grafica) => (
                <GraphContainer key={grafica.id} grafica={grafica} />
              ))}
            </div>
          : <VerTransformador idTransformador={idTransformador} />
        }
      </div>
      <footer className="h-10"></footer>

    </div>
  )
}