import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import api from "../../utils/axiosConfig";
import Button from "react-bootstrap/esm/Button";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
function FormCavas({ empresa }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: ''
    });
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
             const response = await api.post('/api.php/cavas', {
                nombre:formData.nombre,
                empresa:empresa,
                cvuid:uuidv4(),
                capacidad:2
             }, {
               headers: {
                 '_METHOD': 'POST' // Header adicional para servidores problemáticos
               }
             });
         
             if (response.data.message=="Cava registrada") {
            Swal.fire({
                title: "Se registro correctamente",
                icon: "success",
                draggable: true
            }).then(()=>{
                navigate('/dashboard/cavas')
                window.location.reload();
              });
            setFormData({
                nombre: ''
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
            <div className="text-end">
                <Button variant="danger" className="m-1" data-bs-dismiss="modal" >Cancelar</Button>
                <Button variant="primary" type="submit" className="m-1" data-bs-dismiss="modal">Guardar</Button>
            </div>
        </Form>
    );
}
export default FormCavas;