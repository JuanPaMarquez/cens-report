import PintarGraficas from "./PintarGraficas"

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="w-full h-full p-3">
      <h1 className="pb-2 font-bold">Ultima actualizacion: {currentDate}</h1>
      <div id="table-graficas" className="w-full h-screen">
        <PintarGraficas />
      </div>
    </div>
  )
}