import { useEffect, useState } from "react"
import { useFisicoQuimico } from "../../../lib/store/CurrentTable"

export default function Fisicoquimico() {
  const { fisicoQuimicoTime } = useFisicoQuimico()
  const [ date, setDate ] = useState<string>("")

  useEffect(() => {
    const currentDate = fisicoQuimicoTime ? new Date(fisicoQuimicoTime).toLocaleString() : "No hay datos"
    setDate(currentDate)
  }, [fisicoQuimicoTime])
  
  return (
    <div className="w-full h-full">
      <h1 className="pb-2 font-bold text-center md:text-left">Ultima actualizacion: {date}</h1>
      <h1>Fisico-quimico</h1>
    </div>
  )
}