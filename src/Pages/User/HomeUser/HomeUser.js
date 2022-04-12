import './HomeUser.css';
import { getData } from '../../../utils/requests.js';
import { useEffect, useState } from 'react';

const HomeUser = ({
  setUserAutenticated,
  userAutenticated,
  adminAutenticated,
  setAdminAuthenticated,
}) => {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const data = getData(
      localStorage.getItem(process.env.REACT_APP_USER_ACCESS_TOKEN_KEY),
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users/profile`
    );

    data.then((data) => setUserData(data));

    if (userAutenticated && adminAutenticated) {
      setAdminAuthenticated(false);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.setItem(process.env.REACT_APP_USER_AUTENTICATED_KEY, false);
    localStorage.removeItem(process.env.REACT_APP_USER_ACCESS_TOKEN_KEY);
    setUserAutenticated(false);
  };
  return (
    <div>
      <h1>welcome {userData.name}</h1>
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
};

export default HomeUser;
