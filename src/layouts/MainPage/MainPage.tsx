import MenuBar from "./MenuBar"

export default function MainPage({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full h-full flex flex-row">
      <MenuBar />
      {children}
    </div>
  )
}