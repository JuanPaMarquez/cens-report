import { ButtonLogin } from "../../components/Button";
import { InputRegister } from "../../components/Inputs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react"

export default function Register() {

  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setPassword] = useState('')
  const [inputPasswordRepat, setInputPasswordRepat] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>, setElement: (e: string) => void) => {
    setElement(e.target.value); 
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center m-4">Crea tu cuenta!</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2">
          <InputRegister 
            inputElement={inputName} 
            setInputElement={setInputName} 
            type="text" 
            placeholder="Nombre" 
          />
          <InputRegister 
            inputElement={inputEmail} 
            setInputElement={setInputEmail} 
            type="email" 
            placeholder="Correo" 
          />
          <InputRegister 
            inputElement={inputPassword} 
            setInputElement={setPassword} 
            type={`${showPassword ? "text": "password"}`} 
            placeholder="Contraseña" 
            onChange={(e) => handlePassword(e, setPassword )}
          />
          <InputRegister 
            inputElement={inputPasswordRepat} 
            setInputElement={setInputPasswordRepat} 
            type={`${showPassword ? "text": "password"}`} 
            placeholder="Repite la contraseña" 
            onChange={(e) => handlePassword(e, setInputPasswordRepat )}
          />
          <button 
            type='button'
            className='flex gap-2 cursor-pointer items-center hover:underline' 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar": "Mostrar"} contraseña 
            {showPassword ? <IoMdEye className="size-5" /> : <IoMdEyeOff className="size-5" /> }
          </button>
          <ButtonLogin type="submit" className="bg-green-500 hover:bg-green-700" >Registrarse</ButtonLogin>
        </div>
      </form>
    </div>
  )
}