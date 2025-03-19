import { MdDelete } from "react-icons/md";

export default function ListarExcel() {

  const data = [1,2,3,4]

  return (
    <>
      <h1 className="w-full text-2xl px-5 font-bold">Historial</h1>
      <div className="w-full border border-gray-300 ">
        <table className="w-full border-collapse">
          <thead className="bg-green-700 text-white h-14 sticky top-0 z-100">
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
      </div>
    </>
  )
}