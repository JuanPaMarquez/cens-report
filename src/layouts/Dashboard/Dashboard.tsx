import { useOutlet } from "react-router";


export default function Dashboard() {
  const outlet = useOutlet();
  
  return (
    <div className="w-full h-full md:p-3">
      {outlet ? outlet : <h1>Dashboard</h1>}
    </div>
  )
}