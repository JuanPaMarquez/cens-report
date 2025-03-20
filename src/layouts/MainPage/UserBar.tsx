import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function UserBar({
  isMenuOpen, 
  handleMenu 
}:{ 
  isMenuOpen: boolean;
  handleMenu: () => void }
) {
  
  const user = {
    name: "Ing Gerardo Camperos"
  }

  useEffect(() => {

  }, [])
  
  return (
    <div className="sticky z-50 top-0 w-full flex justify-between pl-4 items-center py-1 pr-2 border-b-2 border-gray-200 bg-white">
      <button 
        className="text-gray-500 cursor-pointer"
        onClick={handleMenu}
      >
        { isMenuOpen 
          ? <FaChevronCircleLeft className="size-6" /> 
          : <FaChevronCircleRight className="size-6" /> } 
      </button>
      <button id="user" className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg">
        <div className="size-8 text-white font-bold bg-gray-300 flex justify-center items-center rounded-full">
          <FaUser className="size-4 text-black" />
        </div>
          {user.name}
          <RiArrowDropDownLine className="size-7 text-gray-500" />
      </button>
    </div>
  )
}