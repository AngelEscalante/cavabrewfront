import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import api from "../../utils/axiosConfig";
import Button from "react-bootstrap/esm/Button";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import AsignarBotellas from '../../components/formularios/asignarBotellas';
import { Modal } from 'bootstrap'; // Importa Modal de Bootstrap

function AsignacionProductos({ empresa }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        qr: ''
    });
    const [cliente, setCliente] = useState('');
    const [cava, setCava] = useState('');
    const modalRef = useRef(null); // Referencia para el modal

    // Inicializar el modal cuando el componente se monta
    useEffect(() => {
        if (modalRef.current) {
            new Modal(modalRef.current); // Inicializa el modal de Bootstrap
        }
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
            const response = await api.post('/api.php/valida', {
                qr: formData.qr
            }, {
                headers: {
                    '_METHOD': 'POST'
                }
            });
            
            console.log(response);
            
            if (response.data[0].message == "Cava sin asignar") {
                Swal.fire({
                    title: "Sin Usuario",
                    text: "Esta cava no cuenta con usuario",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar"
                });
            } else {
                setCava(response.data[0].cava);
                setCliente(response.data[0].cliente);
                
                // Abrir el modal aquí
                if (modalRef.current) {
                    const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
                    modal.show();
                }
            }
            
            setFormData({
                qr: ''
            });
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
        }
    };

    return (
        <>
            <div 
                className="modal fade" 
                id="formmodalModalToggle" 
                aria-hidden="true" 
                aria-labelledby="formmodalModalToggleLabel"
                ref={modalRef} // Asigna la referencia aquí
            >
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formmodalModalToggleLabel">Asignar Botellas</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <AsignarBotellas empresa={empresa} cava={cava} cliente={cliente}/>
                        </div>
                    </div>
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>QR</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="qr"
                        name="qr"
                        value={formData.qr}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="text-end">
                    <Button variant="primary" type="submit" className="m-1">Validar</Button>
                </div>
            </Form>
        </>
    );
}

export default AsignacionProductos;