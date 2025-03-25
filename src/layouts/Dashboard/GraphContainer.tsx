import { GraficasInterface } from "../../lib/helpers/GraphData"

export default function GraphContainer({ 
  grafica,
}:{ 
  grafica: GraficasInterface,
}) {
  const { Component, data, title, styles } = grafica

  return (
    <div 
      className={`pb-5 pt-2 px-2 rounded-md shadow-md col-span-1 ${styles}`}>
      <h1 className="text-center">{title}</h1>
      <div className="flex justify-start items-center h-full">
        { data !== null ? <Component data={data} /> : <Component /> }
      </div>
    </div>
  )
}