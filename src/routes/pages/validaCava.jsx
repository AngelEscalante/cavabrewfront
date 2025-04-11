import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import api from "../../utils/axiosConfig";
import Button from "react-bootstrap/esm/Button";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
function ValidaCava({ empresa }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        qr: ''
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
             const response = await api.post('/api.php/valida', {
                qr:formData.qr
             }, {
               headers: {
                 '_METHOD': 'POST' // Header adicional para servidores problemáticos
               }
             });
             console.log(response)
             if (response.data[0].message=="Cava sin asignar") {
            Swal.fire({
                  title: response.data[0].message,
                  text: response.data[0].nombre+ " esta libre para asignar",
                  icon: "info",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Aceptar",
                  cancelButtonText:"Cancelar"
                })
            setFormData({
                qr: ''
            });
            } else {
                Swal.fire({
                    title: response.data[0].message,
                    text: response.data[0].nombre+ " se encuentra asignada a cliente",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Aceptar",
                    cancelButtonText:"Cancelar"
                  })
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
                text: "Ocurrio un error al consultar registro"
            });
        } finally {

        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>QR</Form.Label>
                <Form.Control type="text" placeholder="qr"
                    name="qr"
                    value={formData.qr}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="text-end">
                <Button variant="primary" type="submit" className="m-1">Validar</Button>
            </div>
        </Form>
    );
}
export default ValidaCava;