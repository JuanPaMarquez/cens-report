import { useState } from "react"
import { ButtonLogin } from "../../components/ui/Button"
import Register from "./Register"
import InicioSesion from "./InicioSesion"

export default function Login() {

  const [register, setRegister] = useState(false)


  return (
    <div id="loginBackground" className="flex flex-col items-center justify-center bg-[url(/fondoLogin.webp)] bg-cover h-screen">
      <div id="loginComponent" className={`max-w-200 h-120 max-[560px]:max-w-80 w-full flex bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300`}>
      <div 
        className={`flex-1 z-8 max-[560px]:hidden transition-transform duration-300 
        ${register ? "min-[560px]:translate-x-full" : "min-[560px]:translate-x-0"}`}
      >
        <img className="w-full h-full object-cover" src={`/${register ? "imgRegister" : "imgLogin"}.webp`} alt="image login" />
      </div>
      <div 
        id="loginForm" 
        className={`flex-1 flex flex-col items-center justify-center gap-2 my-4 transition-transform duration-300 
        ${register ? "min-[560px]:-translate-x-full" : "min-[560px]:translate-x-0"}`}
      >
        {register ? <Register /> : <InicioSesion />}
        <ButtonLogin 
          className="bg-green-300 hover:bg-green-200 text-black" 
          onClick={() => setRegister(!register)}
        >
          {register ? "¿Ya tienes Cuenta?" : "¿No tienes Cuenta?"}
        </ButtonLogin>
      </div>
      </div>
    </div>
  )
}