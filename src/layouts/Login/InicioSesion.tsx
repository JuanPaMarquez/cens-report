import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ButtonLogin } from "../../components/Button";
import { InputLogin } from "../../components/Inputs";
import { useNavigate } from "react-router";

export default function InicioSesion (){
  const navegar = useNavigate()

  const [inputUser, setInputUser] = useState('')
  const [inputLock, setInputLock] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("usuario: ",inputUser ,"contraseña: ", inputLock); 
    navegar('/dashboard')
  }

  return (
    <>
      <img className="size-30" src="/accountLogo.webp" alt="" />
      <h1 className="text-2xl font-bold text-center m-4">Inicio Sesion</h1>
      <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <InputLogin 
            inputElement={inputUser}
            setInputElement={setInputUser}
            type="email"
            placeholder="Usuario"
            Icon={FiUser} 
          />
        </div>
        <div className="relative">
          <InputLogin 
            inputElement={inputLock}
            setInputElement={setInputLock}
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            Icon={FiLock} 
          />
          {inputLock !== '' && ( 
          <button 
            type='button'
            className='absolute top-3 right-3 cursor-pointer' 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" /> }
          </button>)}
        </div>
        <ButtonLogin 
          type="submit"  
        >
          Ingresar
        </ButtonLogin>
      </form>
    </>
  )
}