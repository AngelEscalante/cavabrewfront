import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notFound";
import Logo from "../assets/CavabrewLogo.png";
import Configuraciones from "./pages/config";
import UsuariosLista from "./pages/usuarios";
import ClientesLista from "./pages/clientes";
import ProductosLista from "./pages/productos";
import ComedorLista from "./pages/comedor";
import ModalForm from "../components/modals";
import CavaList from "./pages/cavas";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard/*", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Menu"} page={<></>} modal={<></>}  licencia={"14/03/2026"} rol={"demo"}/> },
  { path: "/dashboard/usuarios", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Usuarios"} page={<UsuariosLista empresa={2}/>} modal={<ModalForm form={"usuarios"} empresa={2} />} licencia={"14/03/2026"} rol={"prueba"}/> },
  { path: "/dashboard/permisos", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Permisos"} page={<Configuraciones />} modal={<></>}  licencia={"14/03/2026"} rol={"prueba"}/>  },
  { path: "/dashboard/configuracion", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Configuración"} page={<Configuraciones />} modal={<></>} rol={"prueba"}/> },
  { path: "/dashboard/clientes", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Cliente"} page={<ClientesLista empresa={3}/>} modal={<ModalForm form={"clientes"} empresa={3} />}  licencia={"14/03/2026"} rol={"prueba"}/> },
  { path: "/dashboard/productos", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Productos"} page={<ProductosLista empresa={3} />} modal={<ModalForm form={"productos"} empresa={3} />}  licencia={"14/03/2026"} rol={"prueba"}/> },
  { path: "/dashboard/cavas", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Cavas"} page={<CavaList empresa={3} />} modal={<ModalForm form={"cavas"} empresa={3} />}  licencia={"14/03/2026"} rol={"prueba"}/> },
  { path: "/dashboard/comedor", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Aperturas"} page={<ComedorLista empresa={3} />} modal={<ModalForm form={"aperturas"} empresa={2} />}  licencia={"14/03/2026"} rol={"prueba"}/> },
  { path: "/dashboard/reportes", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Reportes"} page={<Configuraciones />}  modal={<></>} licencia={"14/03/2026"} rol={"prueba"}/> },
  { path: "*", element: <NotFound /> }, // Página 404
]);

export default function AppRouter() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>);
}
