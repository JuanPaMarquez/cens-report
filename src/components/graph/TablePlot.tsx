export default function TablePlot({ 
  data = [
    {
      label: "Operativos",
      value: Math.ceil(Math.random() * 100),
    },
    {
      label: "Inactivos",
      value: Math.ceil(Math.random() * 100),
    },
    {
      label: "Fallando",
      value: Math.ceil(Math.random() * 100),
    }
] }) {
  console.log(data)
  
  return (
    <div>
      <h1>TablePlot</h1>
    </div>
  )
}