import Form from 'react-bootstrap/Form';
import SelectedData from "../list";
import DataTableList from '../tableList';
const producto = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Cajero' },
    { value: '3', label: 'Perfil 3' }
];
function FormAperturas() {
    let cava = "";
    return (
        <>
            <br />
            <h4>Cava Cliente</h4>
            <Form>
                <div className='row'>
                    <div className='col-md-6'>
                        <Form.Group>
                            <Form.Label>Cliente</Form.Label>
                            <div className='row row-cols-lg-auto'>
                                <div className="col-12">
                                    <Form.Control type="text" placeholder="Cliente" id='Cliente' />
                                </div>
                                <div class="col-12">
                                    <button className='btn btn-outline-primary'>Buscar</button>
                                </div>
                            </div>

                        </Form.Group>
                    </div>
                    <div className='col-md-6'>
                        <Form.Group>
                            <Form.Label>Cava</Form.Label>
                            <div className='row row-cols-lg-auto'>
                                <div className="col-12">
                                    <Form.Control type="text"  id='Cava' disabled={true} value={cava} />
                                </div>
                                <div className="col-12">
                                    <button className='btn btn-outline-primary'>Apertura de Cava</button>
                                </div>
                            </div>
                        </Form.Group>
                    </div>
                </div>
                <div className='row' id="cavaCliente">
                    <div className='col-md-6'>
                        <Form.Group>
                            <Form.Label>Producto</Form.Label>
                            <div className='row'>
                                <div className="col-8">
                                    <SelectedData lista={producto} />
                                </div>
                                <div className="col-4">
                                    <button className='btn btn-outline-primary'>Agregar</button>
                                </div>
                            </div>
                        </Form.Group>
                    </div>
                    <div className='col-md-6'></div>
                </div>
            </Form>
            <DataTableList></DataTableList>
            <div className='text-end pb-2' id='tableCliente'>
                <button className='btn btn-outline-secondary me-2'>Cancelar</button>
                <button className='btn btn-outline-success me-2'>Actualizar</button>
                <button className='btn btn-outline-danger'>Cerrar Cava</button>
            </div>
        </>
    );
}
export default FormAperturas;