import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from "lucide-react";
import DataTableList from "../../components/tableList";
import api from "../../utils/axiosConfig";
import FormAperturas from "../../components/formularios/aperturas";
export default function ComedorLista({ empresa }) {
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [colums, setColums] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (!empresa) return; // Evita llamadas si no hay empresa o ya está cargando

            setLoading(true);
            try {
                const obtenerCliente = await api.get(`api.php/clienteslistas?empresa=${empresa}`);
                const clientesLista = obtenerCliente.data.map(item => ({
                    id: item.id,
                    nombre: `${item.nombre}`
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
                    { name: 'Nombre', selector: row => row.nombre },
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
    <div className="row">
        <div className="col-md-4 border border-black rounded-start">
            <br></br>
            <h4>Cavas Aperturadas</h4>
            <DataTableList />
        </div>
        <div className="col-md-8 border border-black rounded-end">
            <FormAperturas></FormAperturas>
        </div>
    </div>
        
    </>)
}

const editar = (id) => console.log('Editando', id);
const desactivar = (id) => console.log('Desactivando', id);