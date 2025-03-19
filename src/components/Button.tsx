import { useNavigate, useLocation } from "react-router"

export function ButtonMenu ({ 
  children,
  icon: Icon,
}:{ 
  children: string,
  icon: React.ElementType,
}){
  const navegar = useNavigate()
  const { pathname } = useLocation()
  const service = pathname.split('/')[1]

  const handleNavigate = () => {
    navegar(`/${children.toLowerCase()}`)
  }

  return (
    <button 
      className={`flex items-center gap-3 cursor-pointer px-5 h-10 hover:bg-gray-200 hover:rounded-lg ${service === children.toLowerCase() ? 'text-green-500 font-bold bg-gray-200 rounded-lg' : ''}`}

      onClick={handleNavigate}
    >
      <Icon className="size-6" />
      {children}
    </button>
  )
}

export { ButtonMenu as default }
