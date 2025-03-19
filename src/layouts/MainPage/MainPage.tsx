import MenuBar from "./MenuBar"
import UserBar from "./UserBar"

export default function MainPage({ children }: { children: React.ReactNode }) {

  
  return (
    <div className="w-full h-full flex relative">
      <MenuBar />
      <div className="flex w-full h-full flex-col justify-start overflow-y-auto">
        <UserBar />
        {children}
      </div>
    </div>
  )
}