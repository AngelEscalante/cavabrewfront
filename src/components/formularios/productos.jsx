import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import SelectedData from "../list";
import api from "../../utils/axiosConfig";
import Button from "react-bootstrap/esm/Button";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
function FormProductos({ empresa }) {
    const [grupos, setgrupos] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        grupo: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseGrupos = await api.get(`api.php/grupos`);
                const gruposData = responseGrupos.data.map(item => ({
                    value: item.id,
                    label: item.nombre
                }));
                setgrupos(gruposData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, []);
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
             const response = await api.post('/api.php/productos', {
                nombre:formData.nombre,
                grupo: formData.grupo,
                empresa:empresa
             }, {
               headers: {
                 '_METHOD': 'POST' // Header adicional para servidores problemáticos
               }
             });
         
             if (response.data.message=="Producto registrado") {
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
                grupo: ''
            });
            } else {
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ocurrio un error al intentar realizar el registro"
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
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Grupos</Form.Label>
                <SelectedData lista={grupos}
                    value={formData.grupo}
                    onChange={handleChange}
                    name="grupo"  // Asegúrate de pasar el nombre
                />
            </Form.Group>
            <div className="text-end">
                <Button variant="danger" className="m-1" data-bs-dismiss="modal" >Cancelar</Button>
                <Button variant="primary" type="submit" className="m-1" data-bs-dismiss="modal">Guardar</Button>
            </div>
        </Form>
    );
}
export default FormProductos;