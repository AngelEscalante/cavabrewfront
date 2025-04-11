import Impresoras from "../../components/configuracion/listaimpresoras";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
export default function Configuraciones() {
    return (
        <div>
            <Form>
                <div className="row">
                    <div className="col-md-4">
                        <Form.Group classNam>
                            <Form.Label>Impresora</Form.Label>
                            <Impresoras />
                        </Form.Group>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"></div>
                </div>
                <div className="text-end">
                    <Button variant="danger" type="submit" >Cancelar</Button>
                    <Button variant="primary" type="submit" >Guardar</Button>
                </div>
            </Form>

        </div>
    )
}