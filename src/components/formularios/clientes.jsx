import React, { useState, useEffect } from 'react';
import SelectedData from "../list";
import Form from 'react-bootstrap/Form';
import api from "../../utils/axiosConfig";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function FormClientes({ empresa }) {
    const [membresias, setMembresias] = useState([]);
    const [cavasList, setCavasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        direccion: '',
        telefono: '',
        membresia: '',
        cava: '',
        empresa: empresa
    });

    useEffect(() => {
        if (!empresa) return; // No ejecutar si no hay empresa
        
        const controller = new AbortController();
        const signal = controller.signal;
        
        const fetchData = async () => {
            setLoading(true);
            try {
                // Obtener membresías
                const [membresiasRes, cavasRes] = await Promise.all([
                    api.get(`api.php/membresias?empresa=${empresa}`, { signal }),
                    api.get(`api.php/cavaslista?empresa=${empresa}`, { signal })
                ]);
                
                setMembresias(membresiasRes.data.map(item => ({
                    value: item.id,
                    label: item.nombre
                })));
                
                setCavasList(cavasRes.data.map(item => ({
                    value: item.id,
                    label: item.nombre
                })));
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar datos:", error);
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
        
        return () => controller.abort();
    }, [empresa]); // Solo se ejecuta cuando empresa cambia // Solo dependencia de `empresa`
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Usa FormData para mayor compatibilidad
             const response = await api.post('/api.php/clientes', {
                nombre: formData.nombre,
                apellido_paterno: formData.apellido_paterno,
                apellido_materno: formData.apellido_materno,
                direccion: formData.direccion,
                telefono: formData.telefono,
                membresia: formData.membresia,
                idcl:'',
                cava: formData.cava,
                empresa: empresa,
                estatus:1
            }, {
               headers: {
                 '_METHOD': 'POST' // Header adicional para servidores problemáticos
               }
             });
         
             if (response.data.message=="Cliente registrado") {
                Swal.fire({
                    title: "Se registro correctamente",
                    icon: "success",
                    draggable: true
                }).then(()=>{
                    navigate('/dashboard/productos')
                    window.location.reload();
                });
            setFormData({
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                direccion: '',
                telefono: '',
                membresia: '',
                cava: '',
                empresa: empresa
            });
            } 
        } catch (error) {
            console.error('Error completo:', {
                request: error.request,
                response: error.response,
                message: error.message
            });
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error al intentar realizar el registro"
            });
        } finally {

        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control type="text" placeholder="Apellido Paterno"
                    name="apellido_paterno"
                    value={formData.apellido_paterno}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control type="text" placeholder="Apellido Materno"
                    name="apellido_materno"
                    value={formData.apellido_materno}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" placeholder="Telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Membresia</Form.Label>
                <SelectedData lista={membresias}
                    value={formData.membresia}
                    onChange={handleChange}
                    name="membresia"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Cava</Form.Label>
                <SelectedData lista={cavasList}
                    value={formData.cava}
                    onChange={handleChange}
                    name="cava"
                />
            </Form.Group>
            <div className="text-end">
                {/* Botón de envío u otras acciones */}
            </div>
            <div className="text-end">
                <Button variant="danger" className="m-1" data-bs-dismiss="modal" >Cancelar</Button>
                <Button variant="primary" type="submit" className="m-1" data-bs-dismiss="modal">Guardar</Button>
            </div>
        </Form>
    );
}

export default FormClientes;