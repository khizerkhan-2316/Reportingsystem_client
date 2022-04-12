import './Navigationbar.css';
import Button from '../../stateless/Button/Button.js';
import logo from '../../../Assets/Images/bilbasen-logo.png';
const Navigationbar = ({ setAdminAuthenticated }) => {
  const logoutHandler = () => {
    localStorage.setItem(process.env.REACT_APP_ADMIN_AUTENTICATED_KEY, false);
    localStorage.removeItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY);
    setAdminAuthenticated(false);
  };

  return (
    <nav>
      <div className="nav-items">
        <img className="nav-logo" src={logo} alt="logo" />
        <Button
          onClick={logoutHandler}
          style={{ padding: '5px 20px 5px 20px' }}
        >
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default Navigationbar;
