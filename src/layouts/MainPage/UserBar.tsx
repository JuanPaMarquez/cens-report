import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function UserBar() {
  const user = {
    name: "Ing Gerardo Camperos"
  }

  
  return (
    <div className="sticky z-50 top-0 w-full flex justify-end items-center py-1 pr-2 border-b-2 border-gray-200 bg-white">
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