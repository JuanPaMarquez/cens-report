import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function ListarExcel() {

  const [isDelete, setIsDelete] = useState(false)

  const data = [1,2,3,4]

  const handleDelete = () => {
    console.log('Borrando')
  }

  const handleUpload = () => {
    console.log('Subiendo')
  }

  return (
    <>
      <div id="table-title" className="w-full flex justify-between items-center px-5">
        <h1 className="w-full text-2xl font-bold">Historial</h1>
        <button 
          className={`p-1 w-22 rounded-2xl cursor-pointer font-bold ${isDelete ? 'bg-green-400' : 'bg-red-400'}`}
          onClick={() => setIsDelete(!isDelete)}
        >
          {isDelete ? 'Subir' : 'Eliminar'}
        </button>
      </div>
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
                <td className="">
                  <div className="flex justify-end pr-4">
                    { /* Verifica si el usuario quiere borrar o no */
                    isDelete ? 
                      <button 
                        className="flex justify-center items-center h-8 px-4 rounded-md cursor-pointer text-black hover:bg-red-500"
                        onClick={handleDelete}
                      >
                        <MdDelete className="size-6"/>
                      </button>
                    : 
                      <button 
                        className="h-8 w-18 px-2 rounded-md cursor-pointer hover:bg-green-500" 
                        onClick={handleUpload}
                      >
                        Subir
                      </button>
                    }
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