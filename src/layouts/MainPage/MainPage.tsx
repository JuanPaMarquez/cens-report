import { useEffect, useState } from "react"
import MenuBar from "./MenuBar"
import UserBar from "./UserBar"
import { useLocation } from "react-router"

export default function MainPage({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const location = useLocation();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    // Verificar si la pantalla es menor que el tamaño `md` de Tailwind
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // `md` en Tailwind es 768px
    setIsMenuOpen(!mediaQuery.matches);

    // Escuchar cambios en el tamaño de la pantalla
    const handleResize = () => {
      setIsMenuOpen(!mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    // Cerrar el menú si la pantalla es menor que `md` y cambia la ruta
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      setIsMenuOpen(false);
    }
  }, [location]); // Ejecutar este efecto cuando cambie la ruta

  return (
    <div className="w-full h-full flex relative">
      <MenuBar isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
      <div className="flex w-full h-full flex-col justify-start overflow-y-auto">
        <UserBar isMenuOpen={isMenuOpen} handleMenu={handleMenu} />
        {children}
      </div>
    </div>
  )
}