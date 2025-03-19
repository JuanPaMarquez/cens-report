import { MdSpaceDashboard, MdReport, MdAddCircle, MdOutlineSettings, MdAccountCircle, MdHelp  } from "react-icons/md";
import {ButtonMenu} from "../../components/Button";

export default function MenuBar() {
  return (
    <div className="text-center max-w-65 w-full h-full bg-[#F1F2F7] flex flex-col justify-between">
      <div id="options" className="flex flex-col gap-7">
        <div id="nombre" className="flex items-center gap-3 p-2 mx-3 border-b-2 border-gray-200">
          <div className="size-10 text-white font-bold bg-green-500 flex justify-center items-center rounded-full">CR</div>
          <h1 className="font-bold text-green-500 ">CENS REPORT</h1>
        </div>
        <div id="menu" className="text-gray-400 px-2 text-left">
          <span className="px-5 text-bold">MENU</span>
          <div id="menu-options" className="flex flex-col mt-4">
            <ButtonMenu icon={MdSpaceDashboard}>Dashboard</ButtonMenu>
            <ButtonMenu icon={MdReport}>Reportes</ButtonMenu>
            <ButtonMenu icon={MdAddCircle }>Actualizar</ButtonMenu>
          </div>
        </div>
        <div id="otros" className="text-gray-400 px-2 text-left">
          <span className="px-5 text-bold">OTROS</span>
          <div id="menu-options" className="flex flex-col mt-4">
            <ButtonMenu icon={MdOutlineSettings}>Ajustes</ButtonMenu>
            <ButtonMenu icon={MdAccountCircle}>Cuenta</ButtonMenu>
            <ButtonMenu icon={MdHelp}>Ayuda</ButtonMenu>
          </div>
        </div>
      </div>
      <div id="logo" className="flex justify-center items-center mb-10">
        <img src="/censLogo.webp" className="w-40" alt="logo cens" />
      </div>
    </div>
  )
}