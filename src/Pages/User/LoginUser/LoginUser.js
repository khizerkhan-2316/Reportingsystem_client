import LoginCard from '../../../Components/stateful/LoginCard/LoginCard.js';
import { useEffect } from 'react';
const LoginUser = ({ setUserAutenticated, setAdminAuthenticated }) => {
  useEffect(() => {
    setAdminAuthenticated(false);
  });

  return (
    <LoginCard
      url={`${process.env.REACT_APP_BASE_ENDPOINT}/api/users/login-user`}
      heading={'User Login'}
      storageKey={process.env.REACT_APP_USER_AUTENTICATED_KEY}
      setAuthentication={setUserAutenticated}
    />
  );
};

export default LoginUser;
