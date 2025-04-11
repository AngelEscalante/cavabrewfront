import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from "lucide-react";
import DataTableList from "../../components/tableList";
import api from "../../utils/axiosConfig";

export default function CavaList({ empresa }) {
    const [loading, setLoading] = useState(false);
    const [cavas, setCavas] = useState([]);
    const [colums, setColums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (loading || !empresa) return; // Evita llamadas si no hay empresa o ya está cargando

            setLoading(true);
            try {
                const obtenerCava = await api.get(`api.php/cavas?empresa=${empresa}`);
                const cavaLista = obtenerCava.data.map(item => ({
                    id: item.id,
                    nombre: `${item.nombre}`
                }));
                setCavas(cavaLista);

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
                    { name: 'Nombre Cava', selector: row => row.nombre },
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
            <a className="btn btn-outline-success" data-bs-toggle="modal" href="#formmodalModalToggle" role="button">
                Nuevo Registro
            </a>
            <DataTableList columns={colums} data={cavas} />
        </>
    );
}

const editar = (id) => console.log('Editando', id);
const desactivar = (id) => console.log('Desactivando', id);