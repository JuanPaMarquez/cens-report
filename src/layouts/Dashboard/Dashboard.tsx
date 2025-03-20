// import LinePlot from "../../components/LinePlot"
import CirclePlot from "../../components/graph/CirclePlot"
import LinePlot2 from "../../components/graph/LinePlot2"

export default function Dashboard() {
  const data = [1,2,3,4,5,6,7,8,9,10]
  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="w-full h-full p-3">
      <h1 className="pb-2 font-bold">Ultima actualizacion: {currentDate}</h1>
      <div id="table-graficas" className="w-full h-screen">
        <div className="grid grid-flow-dense gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {data.map((item, index) => (
            <div key={index} className={`pb-5 pt-2 px-2 h-70 rounded-md shadow-md col-span-1 ${item === 3 || item === 10 ? 'md:col-span-2' : ''}`}>
              <h1 className="text-center">Grafica {item}</h1>
              <div className="flex justify-start items-center h-full">
                {item % 2 !== 0? <LinePlot2 /> : <CirclePlot />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}