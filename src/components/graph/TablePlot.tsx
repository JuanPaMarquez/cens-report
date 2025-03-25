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
  console.log(data)
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          { /* INFORMACION AQUI */ }
        </tbody>
      </table>
    </div>
  )
}