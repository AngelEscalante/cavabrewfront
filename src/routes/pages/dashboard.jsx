import { Link, Outlet } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import Banner from "../../components/banner";
import Container from "react-bootstrap/esm/Container";

export default function Dashboard({empresa,logo,titulo,licencia,page,rol,modal}) {
  return (
    <div className="d-flex flex-column min-vh-100"> 
            {/* Navbar */}
            <Banner empresa={empresa} logo={logo} />

            {/* Contenido principal */}
            <Card className='m-3 text-start flex-grow-1 dashboard-card'>
                <Card.Header className="text-center">
                    <h2 className="text-xl font-bold mb-4">{titulo}</h2>
                </Card.Header>
                <Card.Body className="dashboard-card">
                    <Container>
                      <Sidebar rol={rol}/>
                      <br></br>
                      {page}
                      {modal}
                    </Container>
                </Card.Body>
            </Card>

            {/* Footer pegado abajo */}
            <footer className="mt-auto dashboard-card">
                <Footer licencia={licencia} />
            </footer>
        </div>
  );
}
