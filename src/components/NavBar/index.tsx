import React from 'react';
import { Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand onClick={() => navigate('/')} className="cursor-pointer">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          WashTime
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" onClick={() => navigate('/')} active={true} className="text-gray-700 dark:text-white">
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="#" onClick={() => navigate('/wash-types')} className="text-gray-700 dark:text-white">
          Tipos de Lavagem
        </Navbar.Link>
        <Navbar.Link href="#" onClick={() => navigate('/bookings')} className="text-gray-700 dark:text-white">
          Reservas
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
