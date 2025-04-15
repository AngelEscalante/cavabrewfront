import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/esm/Button";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import SelectedData from "../list";
import api from "../../utils/axiosConfig";

function AsignarBotellas({ empresa, cava, cliente }) {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [botellasList, setBotellasList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxProd, setMaxProd] = useState(2);
    const [isExistingAssignment, setIsExistingAssignment] = useState(false);

    // Cargar productos disponibles y validar asignación existente
    useEffect(() => {
        if (!empresa || !cava || !cliente) return;

        const fetchData = async () => {
            try {
                // Obtener productos disponibles
                const productosRes = await api.get(`api.php/productos?empresa=${empresa}`);
                setProductos(productosRes.data.map(item => ({
                    value: item.id,
                    label: item.nombre
                })));

                // Validar si ya tiene productos asignados
                const validacionRes = await api.get(`api.php/validacava?cliente=${cliente}&cava=${cava}`);

                if (validacionRes.data && validacionRes.data.length > 0) {
                    // Mapear la respuesta según la estructura de tu función PHP
                    const productosAsignados = validacionRes.data.map(item => ({
                        id: item.id_producto, // Usamos id_producto en lugar de id
                        nombre: item.nombre
                    }));
                    setBotellasList(productosAsignados);
                    setIsExistingAssignment(true);
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
                Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [empresa, cava, cliente]);

    const handleAddProduct = () => {
        if (!selectedProduct || (botellasList.length >= maxProd && !isExistingAssignment)) return;

        const producto = productos.find(p => p.value === selectedProduct);
        if (!producto) return;

        if (botellasList.some(item => item.id === selectedProduct)) {
            Swal.fire('Advertencia', 'Este producto ya está en la lista', 'warning');
            return;
        }

        setBotellasList([...botellasList, {
            id: selectedProduct,
            nombre: producto.label
        }]);
        setSelectedProduct('');
    };

    const handleRemoveProduct = (id) => {
        if (isExistingAssignment && botellasList.length <= maxProd) {
            Swal.fire('Información', 'No puedes eliminar productos de una asignación existente', 'info');
            return;
        }
        setBotellasList(botellasList.filter(item => item.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (botellasList.length === 0) {
            Swal.fire('Advertencia', 'Debes agregar al menos un producto', 'warning');
            return;
        }
    
        // Preparar datos para enviar
        const requestData = {
            cliente: cliente,
            cava: cava,
            empresa: empresa,
            botellas: JSON.stringify(botellasList.map(item => ({
                producto: item.id,
                porcentaje: 100
              })))
        };
    
        try {
            const response = await api.post('/api.php/asignaBotella', requestData, {
                headers: {
                    '_METHOD': 'POST',
                    'Content-Type': 'application/json' // Asegurar que se envíe como JSON
                }
            });
            console.log(response)
    
            if (response.data.success) {
                Swal.fire({
                    title: "¡Operación exitosa!",
                    text: response.data.message,
                    icon: "success",
                    draggable: true
                }).then(() => {
                    navigate('/dashboard/asignacion');
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.error || "Ocurrió un error al actualizar"
                });
            }
        } catch (error) {
            console.error('Error:', error);
            let errorMessage = "Ocurrió un error al procesar la solicitud";
            
            if (error.response) {
                // Si hay respuesta del servidor con detalles del error
                errorMessage = error.response.data.error || 
                              error.response.data.message || 
                              errorMessage;
            }
    
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage
            });
        }
    };

    if (loading) return <div className="text-center my-4">Cargando productos...</div>;

    return (
        <div className="container">
            <h2 className="mb-4">Asignar Botellas</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Seleccionar Producto</Form.Label>
                    <div className="d-flex gap-2">
                        <SelectedData
                            lista={productos}
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            name="producto"
                            style={{ flex: 1 }}
                        />
                        <Button
                            variant="outline-primary"
                            onClick={handleAddProduct}
                            disabled={!selectedProduct || (botellasList.length >= maxProd && !isExistingAssignment)}
                        >
                            Agregar
                        </Button>
                    </div>
                    <Form.Text className="text-muted">
                        {isExistingAssignment ?
                            "Puedes agregar más productos" :
                            `Máximo ${maxProd} productos por asignación`}
                    </Form.Text>
                </Form.Group>

                {botellasList.length > 0 && (
                    <div className="mb-4">
                        <h5>Productos asignados</h5>
                        <Table striped bordered hover size="sm" className="mt-3">
                            <thead className="table-dark">
                                <tr>
                                    <th>Producto</th>
                                    <th width="120">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {botellasList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td className="text-center">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleRemoveProduct(item.id)}
                                                disabled={isExistingAssignment && botellasList.length <= maxProd}
                                                title="Eliminar producto"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                        variant="secondary"
                        className="px-4"
                        data-bs-dismiss="modal"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        className="px-4"
                        disabled={botellasList.length === 0}
                        data-bs-dismiss="modal"
                    >
                        Guardar Asignación
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AsignarBotellas;