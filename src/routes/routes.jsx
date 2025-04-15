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
import AsignacionProductos from "./pages/productosAsignacion";
const empresa=3;
const licencia='12/04/2026';
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard/*", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Menu"} page={<></>} modal={<></>}  licencia={licencia} rol={"demo"}/> },
  { path: "/dashboard/usuarios", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Usuarios"} page={<UsuariosLista empresa={empresa}/>} modal={<ModalForm form={"usuarios"} empresa={empresa} />} licencia={licencia} rol={"prueba"}/> },
  { path: "/dashboard/permisos", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Permisos"} page={<Configuraciones />} modal={<></>}  licencia={licencia} rol={"prueba"}/>  },
  { path: "/dashboard/configuracion", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Configuración"} page={<Configuraciones />} modal={<></>} rol={"prueba"}/> },
  { path: "/dashboard/clientes", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Cliente"} page={<ClientesLista empresa={empresa}/>} modal={<ModalForm form={"clientes"} empresa={empresa} />}  licencia={licencia} rol={"prueba"}/> },
  { path: "/dashboard/productos", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Productos"} page={<ProductosLista empresa={empresa} />} modal={<ModalForm form={"productos"} empresa={empresa} />}  licencia={licencia} rol={"prueba"}/> },
  { path: "/dashboard/asignacion", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Asignacion de productos"} page={<AsignacionProductos empresa={empresa} />}  licencia={licencia} rol={"prueba"}/> },
  { path: "/dashboard/cavas", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Cavas"} page={<CavaList empresa={empresa} />} modal={<ModalForm form={"cavas"} empresa={empresa} />}  licencia={licencia} rol={"prueba"}/> },
  { path: "/dashboard/comedor", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Aperturas"} page={<ComedorLista empresa={empresa} />} modal={<ModalForm form={"aperturas"} empresa={2} />}  licencia={licencia} rol={"prueba"}/> },
  { path: "/dashboard/reportes", element: <Dashboard empresa={"CAVABREW"} logo={Logo} titulo={"Reportes"} page={<Configuraciones />}  modal={<></>} licencia={licencia} rol={"prueba"}/> },
  { path: "*", element: <NotFound /> }, // Página 404
]);

export default function AppRouter() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>);
}
