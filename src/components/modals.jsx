//Formularios
import FormUsuarios from "./formularios/usuarios.jsx";
import FormClientes from "./formularios/clientes.jsx";
import FormAperturas from "./formularios/aperturas.jsx";
import FormProductos from "./formularios/productos.jsx";
import FormCavas from "./formularios/cavas.jsx";
import AsignarBotellas from "./formularios/asignarBotellas.jsx";


function getFormularioComponent(form,empresa) {
    switch (form) {
        case 'usuarios':
            return <FormUsuarios empresa={empresa}/>;
        case 'clientes':
            return <FormClientes empresa={empresa}/>;
        case 'cavas':
            return <FormCavas empresa={empresa}/>
        case 'cavaedit':
            return <></>
        case 'productos':
            return <FormProductos empresa={empresa} />
        case 'grupos':
            return <></>
        case 'aperturas':
            return <FormAperturas />
        case 'permisos':
            return <></>
        case 'membresias':
            return <></>
        case 'prodcava':
            return <></>
        default:
            return <p>No se encontró el formulario solicitado.</p>;
    }
}

function ModalForm({ form, title, empresa}) {
    return (
        <>
            <div className="modal fade" id="formmodalModalToggle" aria-hidden="true" aria-labelledby="formmodalModalToggleLabel">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formmodalModalToggleLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {getFormularioComponent(form,empresa)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalForm;
