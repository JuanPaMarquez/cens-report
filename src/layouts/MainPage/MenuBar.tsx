import { MdSpaceDashboard, MdReport, MdAddCircle, MdOutlineSettings, MdAccountCircle, MdHelp  } from "react-icons/md";
import {ButtonMenu} from "../../components/ui/Button";
import { FaChevronCircleLeft } from "react-icons/fa";

export default function MenuBar({
  isMenuOpen, 
  handleMenu 
}:{ 
  isMenuOpen: boolean;
  handleMenu: () => void }
) {
  
  return (
    <div className={`text-center max-w-65 w-full h-full bg-[#F1F2F7] flex flex-col justify-between z-105 absolute md:relative 
      ${isMenuOpen ? "block": "hidden"}`}
    >
      <div id="options" className="flex flex-col gap-7">
        <div id="nombre" className="flex items-center justify-between gap-3 p-2 mx-3 border-b-2 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="size-10 text-white font-bold bg-green-500 flex justify-center items-center rounded-full">CR</div>
            <h1 className="font-bold text-green-500 ">CENS REPORT</h1>
          </div>
          <button 
            className={`text-gray-500 cursor-pointer md:hidden`}
            onClick={handleMenu}
          >
            <FaChevronCircleLeft className="size-6" />
          </button>
        </div>
        <div id="menu" className="text-gray-400 px-2 text-left">
          <span className="px-5 text-bold">MENU</span>
          <div id="menu-options" className="flex flex-col mt-4">
            <ButtonMenu icon={MdSpaceDashboard} link="dashboard/transformadores">Dashboard</ButtonMenu>
            <ButtonMenu icon={MdReport} link="reportes">Reportes</ButtonMenu>
            <ButtonMenu icon={MdAddCircle} link="actualizar">Actualizar</ButtonMenu>
          </div>
        </div>
        <div id="otros" className="text-gray-400 px-2 text-left">
          <span className="px-5 text-bold">OTROS</span>
          <div id="menu-options" className="flex flex-col mt-4">
            <ButtonMenu icon={MdOutlineSettings} link="ajustes">Ajustes</ButtonMenu>
            <ButtonMenu icon={MdAccountCircle} link="cuenta">Cuenta</ButtonMenu>
            <ButtonMenu icon={MdHelp} link="ayuda">Ayuda</ButtonMenu>
          </div>
        </div>
      </div>
      <div id="logo" className="flex justify-center items-center mb-10">
        <img src="/censLogo.webp" className="w-40" alt="logo cens" />
      </div>
    </div>
  )
}