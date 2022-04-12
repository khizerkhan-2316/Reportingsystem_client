import LoginCard from '../../../Components/stateful/LoginCard/LoginCard.js';
import { useEffect } from 'react';
const LoginAdmin = ({ setAdminAuthenticated, setUserAutenticated }) => {
  useEffect(() => {
    setUserAutenticated(false);
  });

  return (
    <LoginCard
      url={`${process.env.REACT_APP_LOCAL_HOST_ENDPOINT}/api/users/login-admin`}
      heading={'Admin Login'}
      setAuthentication={setAdminAuthenticated}
      storageKey={process.env.REACT_APP_ADMIN_AUTENTICATED_KEY}
    />
  );
};

export default LoginAdmin;
