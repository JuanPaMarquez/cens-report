import { MdDelete } from "react-icons/md";

export default function ListarExcel() {

  const data = [1,2,3,44,4,4,4,4,4,4,44,]

  return (
    <>
      <h1 className="w-full text-2xl font-bold">Historial</h1>
      <table className="w-full h-full border-collapse">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="text-start p-3">Nombre</th>
            <th className="p-3">Fecha de subida</th>
            <th className="text-end px-5">Acciones</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data.map((item, index) => (
            <tr key={index} className="border-b-1">
              <td className="px-4 py-2">
                Transformadores de potencia CENS {item}
              </td>
              <td className="text-center px-4 py-2">{`${item}/05/2025`}</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-3">
                  <button className="bg-red-300 flex justify-center items-center h-8 px-2 rounded-md cursor-pointer text-black hover:bg-red-500">
                    <MdDelete className="size-6"/>
                  </button>
                  <button className="bg-green-300 h-8 w-18 px-2 rounded-md cursor-pointer hover:bg-green-500">
                    Subir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}