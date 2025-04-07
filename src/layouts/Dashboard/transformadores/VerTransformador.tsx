import { useTransformadores } from "../../../lib/store/CurrentTable"

export default function VerTransformador({ idTransformador }: { idTransformador: string }) {
  const { tableTransformadores } = useTransformadores()
  const transformador = tableTransformadores.find((transformador) => transformador["TR"] === idTransformador)
  const { idHistorial, ...transformadorSinHistorial } = transformador ?? {};
  console.log(idHistorial)
  return (
    <div className="mt-5 flex flex-col gap-4 items-center w-full h-full">
      <h1 className="font-bold text-center">Transformador TR-{idTransformador}</h1>
      <div className="w-full max-w-[600px] overflow-y-auto overflow-x-auto border border-gray-300 rounded-2xl"> {/* Añadido overflow-x-auto */}
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-200 text-gray-700 border-b">
              <th className="w-1/2">Campo</th>
              <th className="w-1/2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transformadorSinHistorial && Object.entries(transformadorSinHistorial).map(([key, value]) => (
              <tr key={key} className="border-b border-gray-400 hover:bg-gray-100 h-10">
                <td className="break-words pl-2">{key}</td>
                <td className="break-words font-bold pl-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}