import Grafica from "./Grafica"
import { useGrafica } from "../../utils/useGrafica"

export default function PintarGraficas() {
  const { graficas } = useGrafica()
  
  return (
    <div className="grid grid-flow-dense gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[100rem]:grid-cols-5 place-content-center">
      {graficas.map((grafica) => (
        <Grafica key={grafica.id} grafica={grafica} />
      ))}
    </div>
  )
}