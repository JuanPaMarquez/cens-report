import Subir from "./Subir"
import ListarExcel from "./ListarExcel"

export default function Actualizar() {


  return (
    <div className="w-full pt-10 md:px-10 flex flex-col gap-3 items-center">
      <Subir />
      <ListarExcel />
    </div>
  )
}