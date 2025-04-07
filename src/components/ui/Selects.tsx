export default function SelectID({ 
  idTransformador, 
  setIdTransformador, 
  transformadoresID 
}:{
  idTransformador: string, 
  setIdTransformador: (id: string) => void, 
  transformadoresID: string[]
}) {

  return (
    <div className="flex justify-center md:justify-start w-full">
      <select 
        className="border border-gray-300 rounded-md shadow-sm m-1 p-2" id="select-transformador"
        onChange={(e) => setIdTransformador(e.target.value)}
        value={idTransformador}
      > 
        <option value="">Seleccione un transformador</option>
        {transformadoresID.map((id) => (
          <option key={id} value={id}>{id.includes("TR-") ? id : "TR-"+id}</option>
        ))}
      </select>
    </div>
  )
}