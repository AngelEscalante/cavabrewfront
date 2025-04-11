import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from "lucide-react";
import DataTableList from "../../components/tableList";
import api from "../../utils/axiosConfig";
import ValidaCava from './validaCava';

export default function ClientesLista({ empresa }) {
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [colums, setColums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (loading || !empresa) return; // Evita llamadas si no hay empresa o ya está cargando

            setLoading(true);
            try {
                const obtenerCliente = await api.get(`api.php/clienteslistas?empresa=${empresa}`);
                const clientesLista = obtenerCliente.data.map(item => ({
                    id: item.id,
                    nombre: `${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`,
                    telefono: item.telefono,
                    estatus: item.estatus == 1 ? 'Activo' : 'Inactivo' // Transformación correcta
                }));
                setClientes(clientesLista);

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
                    { name: 'Nombre Cliente', selector: row => row.nombre },
                    { name: 'Telefono', selector: row => row.telefono },
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

    return (
        <>
        <div className='row'>
            <div className='col-md-6'>
            <a className="btn btn-outline-success" data-bs-toggle="modal" href="#formmodalModalToggle" role="button">
                Nuevo Registro
            </a>
            </div>
            <div className='col-md-6'>
                <ValidaCava empresa={empresa}/>
            </div>
        </div>
            
            <DataTableList columns={colums} data={clientes} />
        </>
    );
}

const editar = (id) => console.log('Editando', id);
const desactivar = (id) => console.log('Desactivando', id);