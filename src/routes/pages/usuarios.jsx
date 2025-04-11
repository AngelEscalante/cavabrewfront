import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from "lucide-react";
import DataTableList from "../../components/tableList";
import api from "../../utils/axiosConfig";


export default function UsuariosLista({empresa}) {
    const [loading, setLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [colums, setColums] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (loading || !empresa) return; // Evita llamadas si no hay empresa o ya está cargando

            setLoading(true);
            try {
                const obtenerCliente = await api.get(`api.php/usuarios?empresa=${empresa}`);
                const usuariosLista = obtenerCliente.data.map(item => ({
                    id: item.id,
                    nombre: item.nombre,
                    usuario: item.usuario,
                    permisos: item.permiso_nombre,
                    estatus: item.estatus == 1 ? 'Activo' : 'Inactivo' // Transformación correcta
                }));
                setUsuarios(usuariosLista);

                const Buttons = ({ row }) => (
                    <>
                        <button className='btn btn-sm btn-outline-success m-1' onClick={() => editar(row.id)}>
                            <Pencil size={12} />
                        </button>
                        <button className='btn btn-sm btn-outline-danger m-1' onClick={() => desactivar(row.id)}>
                            <Trash size={12} />
                        </button>
                    </>
                );

                setColums([
                    { name: 'Nombre', selector: row => row.nombre },
                    { name: 'Usuario', selector: row => row.usuario },
                    { name: 'Perfil', selector: row => row.permisos },
                    { name: 'Estatus', selector: row => row.estatus }, // <<-- Corregido (antes row.Estatus)
                    { name: '', cell: row => <Buttons row={row} />, allowOverflow: true, button: true }
                ]);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [empresa]); // Solo recarga si cambia "empresa"

    return (<>
        <a className="btn btn-outline-success" data-bs-toggle="modal" href="#formmodalModalToggle" role="button">
            Nuevo Registro
        </a>
        <DataTableList columns={colums} data={usuarios}/>
    </>)
}

const editar = (id) => console.log('Editando', id);
const desactivar = (id) => console.log('Desactivando', id);