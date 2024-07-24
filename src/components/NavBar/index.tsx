import React from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <div className="flex items-center flex-row justify-between w-full">
        <div className="flex justify-start">
          <Navbar.Brand onClick={() => navigate('/')} className="cursor-pointer">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              WashTime
            </span>
          </Navbar.Brand>
        </div>
        {user && (
          <div className="flex justify-center flex-grow">
            <Dropdown
              label={<Avatar img={user.photoURL || ''} rounded={true} />}
              inline={true}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.displayName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>
                Sair
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
        <div className="flex justify-end">
          <Navbar.Toggle />
        </div>
      </div>
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
