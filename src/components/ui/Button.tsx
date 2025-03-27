import { ReactNode } from "react"
import { useNavigate, useLocation } from "react-router"

function ButtonMenu ({ 
  children,
  icon: Icon,
  link
}:{ 
  children: string,
  icon: React.ElementType,
  link: string
}){
  const navegar = useNavigate()
  const { pathname } = useLocation()
  const service = pathname.split('/')[1]

  const handleNavigate = () => {
    navegar(`/${link}`)
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

function ButtonLogin ({ 
  children, 
  onClick,
  type='button', 
  className='bg-green-500 hover:bg-green-600'
}:{ 
  children: ReactNode, 
  onClick?: () => void,
  type?: "button" | "submit" | "reset", 
  className?: string 
}) {
  return (
    <button 
      type={type} 
      onClick={onClick}
      className={`w-60 h-9 rounded-2xl cursor-pointer ${className}`}
    >
      {children}
    </button>
  ) 
}

export { ButtonMenu, ButtonLogin }
