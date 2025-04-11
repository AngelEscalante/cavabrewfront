import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import logo from '../assets/CavabrewLogo.png';

export default function LogoLogin(){
  return (
    <Container>
      <Image src={logo} width={150} height={150} roundedCircle />
    </Container>
  );
}
