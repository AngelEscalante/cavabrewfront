import SelectedData from "../list";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import api from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
const perfiles = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Cajero' },
    { value: '3', label: 'Perfil 3' }
];

function FormUsuarios({empresa}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        usuario: '',
        password: '',
        confirmacion: '',
        perfil: '',
        empresa:empresa
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
      
        if (formData.password !== formData.confirmacion) {
          Swal.fire({
              icon: "error",
              title: "Contraseñas no coinciden",
              text: "La contraseña y su confirmación deben ser iguales"
          });
          return; // Detener el envío del formulario
      }
      
      // Validar que la contraseña no esté vacía
      if (!formData.password || formData.password.trim() === '') {
          Swal.fire({
              icon: "error",
              title: "Contraseña vacía",
              text: "Debes ingresar una contraseña"
          });
          return;
      }
  
      try {
          const response = await api.post('/api.php/usuarios', {
              nombre: formData.nombre,
              usuario: formData.usuario,
              password: formData.password,
              permisos: formData.perfil,
              empresa:formData.empresa,
              idcl:'',
              rol:1,
              estatus:1
          }, {
              headers: {
                  '_METHOD': 'POST'
              }
          });
  
          if (response.data.message=="Usuario registrado") {
              Swal.fire({
                  title: "¡Registro exitoso!",
                  icon: "success",
                  draggable: true
              }).then(()=>{
                navigate('/dashboard/usuarios')
                window.location.reload();
              });
              setFormData({
                  nombre: '',
                  usuario: '',
                  password: '',
                  confirmacion: '',
                  perfil: ''
              });
          } else {
              Swal.fire({
                  icon: "error",
                  title: "Error en el registro",
                  text: response.data.message || "Ocurrió un error al registrar el usuario"
              });
          }
      } catch (error) {
          console.error('Error completo:', error);
          Swal.fire({
              icon: "error",
              title: "Error de conexión",
              text: "No se pudo conectar con el servidor"
          });
      }
      };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre Real</Form.Label>
                <Form.Control type="text" placeholder="Nombre" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsuario">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder="Usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmacion">
                <Form.Label>Confirmación de Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirmación"
                name="confirmacion"
                value={formData.confirmacion}
                onChange={handleChange}
                 />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPerfil">
                <Form.Label>Perfil</Form.Label>
                <SelectedData 
                    lista={perfiles}
                    value={formData.perfil}
                    onChange={handleChange}
                    name="perfil"  // Asegúrate de pasar el nombre
                />
            </Form.Group>
            <div className="text-end">
                <Button variant="danger" className="m-1" data-bs-dismiss="modal" >Cancelar</Button>
                <Button variant="primary" type="submit" className="m-1" data-bs-dismiss="modal">Guardar</Button>
            </div>
        </Form>
    );
}

export default FormUsuarios;
