import { Navigate, Route, Routes } from "react-router"
import NotFound from "../layouts/NotFound"
import MainPage from "../layouts/MainPage/MainPage"
import Dashboard from "../layouts/Dashboard/Dashboard"
import Reportes from "../layouts/Reportes/Reportes"
import Actualizar from "../layouts/Actualizar/Actualizar"
import Ajustes from "../layouts/Ajustes/Ajustes"
import Cuenta from "../layouts/Cuenta/Cuenta"
import Ayuda from "../layouts/Ayuda/Ayuda"
import Login from "../layouts/Login/Login"

export default function RoutesApp() {
  return (
    <Routes>
      {/* Rutas de la aplicación */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<MainPage><Dashboard /></MainPage>} />
      <Route path="/reportes" element={<MainPage><Reportes /></MainPage>} />
      <Route path="/actualizar" element={<MainPage><Actualizar /></MainPage>} />
      <Route path="/ajustes" element={<MainPage><Ajustes /></MainPage>} />
      <Route path="/cuenta" element={<MainPage><Cuenta /></MainPage>} />
      <Route path="/ayuda" element={<MainPage><Ayuda /></MainPage>} />

      <Route path="/login" element={<Login />} />
    
      {/* Ruta de 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}