export default function TablePlot({ 
  data = [
    {
      tipo: "MINERAL",
      estados: [
        { estado: "Operativo", suma: Math.ceil(Math.random() * 100) },
        { estado: "Inactivo", suma: Math.ceil(Math.random() * 100) },
        { estado: "Fallando", suma: Math.ceil(Math.random() * 100) },
      ]
    },
    {
      tipo: "VEGETAL",
      estados: [
        { estado: "Operativo", suma: Math.ceil(Math.random() * 100) },
        { estado: "Inactivo", suma: Math.ceil(Math.random() * 100) },
        { estado: "Fallando", suma: Math.ceil(Math.random() * 100) },
      ]
    }
] }) {
  
  return (
    <div className="overflow-x-auto w-full">
      <table className="text-sm border-collapse border border-gray-300 w-full h-full">
        <thead>
          <tr>
            <th className="border border-gray-300">Datos</th>
            { data[0].estados.map((estado, index) => {
              return (
                <th 
                  key={index}
                  className="border border-gray-300 p-1 py-2"
                >
                  {estado.estado}
                </th>
              )}
            )}
          </tr>
        </thead>
        <tbody>
          { /* INFORMACION AQUI */ }
          { data.map((item, index) => (

            <tr key={index} className={`border border-gray-300 ${index === data.length - 1 ? "font-bold" : ""}`}>
              <td className="border border-gray-300 p-1 text-center">{item.tipo}</td>
              { item.estados.map((estado, index) => {
                return (
                  <td 
                    key={index}
                    className={`border border-gray-300 p-1 text-center ${index === item.estados.length - 1 ? "font-bold" : ""}`}
                  >
                    {estado.suma}
                  </td>
                )}
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}