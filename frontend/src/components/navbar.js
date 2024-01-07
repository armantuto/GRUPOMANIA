import Logo from '../GRUPOMANIA IMG/icon-left-font-monochrome-black.svg';
import '../styles/navbar.css';
import '../styles/login.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Home from '../GRUPOMANIA IMG/home.svg';
import Logout from '../GRUPOMANIA IMG/logout.svg'
import User from '../GRUPOMANIA IMG/user.svg'
import Settings from '../GRUPOMANIA IMG/settings.svg';
import { getCurrentUser } from '../utils/utils';

const NavBar = () => {
  const history = useHistory()
  const handleLogout = async () => {
    try {
      localStorage.clear()
      // Indica que el logout fue exitoso en el estado del componente
      // Redirecciona al usuario a la página de inicio o a donde prefieras
      history.push("/")
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const currentUser = getCurrentUser()
  // Renderiza el contenido condicionalmente según si se ha iniciado sesión o no
  return (
    <div>
      {currentUser ? (
        <div className="container1">
          <div className="logoP">
            <Link to="/"><img className="logo1" src={Logo} alt="logo" /></Link>
          </div>
          <div className='iconsH'>
            <div className='iconsHome'>
              <Link to="/dashboard"> <img className="sss2" src={Home} alt="logo" /></Link>
              <span>Home</span>
            </div>
            <div className='iconsHome' >
              <Link to={"/perfile/" + currentUser.userId}>   <img className="sss2" src={User} alt="logo" /></Link>
              <span>Perfile</span>
            </div>
            <div className='iconsHome' >
              <Link to="/edit">   <img className="sss2" src={Settings} alt="logo" /></Link>
              <span>Settings</span>
            </div>
            <div className='iconsHome'>
              <img className="sss2" onClick={handleLogout} src={Logout} alt="logo" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/">
          <div className="container2">
            <div className="logoP2">
              <img className="logo2" src={Logo} alt="logo" />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NavBar;

