import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Users, Shield, Box, Warehouse, ClipboardList, FileText, UtensilsCrossed, Cog } from "lucide-react";

const menuItems = [
  { name: "Usuarios", icon: <Users /> },
//  { name: "Perfiles (Permisos)", icon: <Shield /> },
  { name: "Productos", icon: <Box /> },
  { name: "Cavas", icon: <Warehouse /> },
  { name: "Clientes", icon: <Users /> },
//  { name: "Membresías", icon: <ClipboardList /> },
 // { name: "Configuración", icon: <Cog /> },
  { name: "Comedor", icon: <UtensilsCrossed /> },
  { name: "Reportes", icon: <FileText /> }
];

export default function Sidebar({ rol }) {
  const navigate = useNavigate();

  const handleMenu = (name) => {
    // Simulación de autenticación
    switch (name) {
      case 'Usuarios':
        navigate("/dashboard/usuarios");
        break;
      case 'Productos':
        navigate("/dashboard/productos");
        break;
      case 'Clientes':
        navigate("/dashboard/clientes");
        break;
      case 'Cavas':
        navigate("/dashboard/cavas");
        break;
      case 'Comedor':
        navigate("/dashboard/comedor");
        break;
      case 'Reportes':
        navigate("/dashboard/reportes");
        break;
    }
  };
  return (
    <div className="w-64 h-screen bg-gray-900 text-black flex flex-col fixed left-0 top-0 shadow-lg text-center rounded p-1">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Button key={item.name} onClick={() => handleMenu(item.name)} variant="outline-dark" className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-700 m-1">
            {item.icon} {item.name}
          </Button>
        ))}
      </nav>
    </div>
  );
}