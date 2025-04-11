import api from "../../utils/axiosConfig";
import Swal from "sweetalert2";
async function RegistroDatos(data, form) {
  let baseURL = `api.php?resource=${form}`;
  try {
    const response = await api.post(baseURL, data);
    if (response.data.success)
      Swal.fire({
        title: 'Registro',
        text: 'Se realizo el registro de manera correcta',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    return true;
  } catch (error) {
    console.log('error:',error)
    Swal.fire({
      title: 'Error!',
      text: 'Ocurrio un error al intertar realizar el registro.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }
}
export default RegistroDatos;