import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import LogoLogin from '../../components/logo_login';
import '../../styles/login.css';
import api from '../../utils/axiosConfig'; // Importamos la nueva función

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!usuario || !password) {
          Swal.fire({/* ... */});
          return;
        }
      
        setLoading(true);
      
        try {
          // Usa FormData para mayor compatibilidad
          const formData = new FormData();
          formData.append('usuario', usuario);
          formData.append('password', password);
      
          const response = await api.post('/api.php/login', {
            usuario: usuario,
            password: password
          }, {
            headers: {
              '_METHOD': 'POST' // Header adicional para servidores problemáticos
            }
          });
      
          if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
          } else {
            console.log(response);
            Swal.fire({
                          icon: "error",
                          title: "Error al iniciar sesión",
                          text: response.data.message
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
                        title: "Error al iniciar sesión",
                        text: "Error en el servidor"
                    });
        } finally {
          setLoading(false);
        }
      };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-container">
                <Card className="login-card bg-secondary">
                    <Card.Body className="login-body">
                        <div className="logo-container">
                            <LogoLogin />
                            <h4 className="login-title text-light">CAVABREW SISTEM</h4>
                            <p className="login-subtitle text-light">Powered by Nexuzglobal</p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-light">Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    placeholder="Usuario"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="text-light">Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                />
                            </Form.Group>

                            <div className="text-end">
                                <Button 
                                    variant="dark" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Login'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}