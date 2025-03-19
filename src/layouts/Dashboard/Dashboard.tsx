export default function Dashboard() {
  const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="w-full h-full p-3">
      <h1 className="pb-2 font-bold">Ultima actualizacion: {currentDate}</h1>
      <div id="table-graficas" className="w-full h-screen">
        <div className=" grid grid-flow-dense gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {data.map((item, index) => (
            <div key={index} className={`p-4 h-40 rounded-md shadow-md col-span-1 ${item === 3 || item === 10 ? 'md:col-span-2' : ''}`}>
              <h1 className="text-2xl">Grafica {item}</h1>
              <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptatem.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}