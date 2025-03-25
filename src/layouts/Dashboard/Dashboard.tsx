import useTableStore from "../../lib/store/CurrentTable"
import { GraphData } from "../../lib/helpers/GraphData"
import GraphContainer from "./GraphContainer"

export default function Dashboard() {
  const { tableData } = useTableStore()
  const { graficas } = GraphData({ tableData })

  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="w-full h-full p-3">
      <h1 className="pb-2 font-bold">Ultima actualizacion: {currentDate}</h1>
      <div id="table-graficas" className="w-full">
        { tableData.length > 0 
          ? <div className="grid grid-flow-dense gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[100rem]:grid-cols-5 place-content-center">
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