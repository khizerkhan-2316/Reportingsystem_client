import './HomeAdmin.css';
import { getData } from '../../../utils/requests.js';
import { useEffect, useState } from 'react';
import Searchbar from '../../../Components/stateful/Searchbar/Searchbar.js';
import UserRow from '../../../Components/stateful/User/UserRow.js';
import Modal from '../../../Components/stateful/Modal/Modal.js';
import DropdownList from '../../../Components/stateful/Dropdownlist/DropdownList.js';
const HomeAdmin = ({
  userAutenticated,
  adminAutenticated,
  setUserAutenticated,
}) => {
  const [adminData, setAdminData] = useState('');
  const [users, setUsers] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const initializeAllRequests = () => {
    const data = getData(
      localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
      `${process.env.REACT_APP_LOCAL_HOST_ENDPOINT}/api/users/admin`
    );

    data.then((data) => setAdminData(data));

    const usersdata = getData(
      localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
      `${process.env.REACT_APP_LOCAL_HOST_ENDPOINT}/api/users`
    );

    usersdata.then((data) => {
      setUsers(data);
    });
  };

  const displayUsers = () => {
    return users !== '' && searchInput === ''
      ? users.map((user) => <UserRow key={user._id} user={user} />)
      : users !== ''
      ? users.map((user) =>
          user.name.toLowerCase().includes(searchInput.toLowerCase()) ? (
            <UserRow key={user._id} user={user} />
          ) : null
        )
      : '';
  };

  const clearQuery = () => {
    setSearchInput('');
  };

  useEffect(() => {
    initializeAllRequests();

    if (adminAutenticated && userAutenticated) {
      setUserAutenticated(false);
    }
  }, []);

  return (
    <div className="home-main-container">
      <div className="seach-and-filter-container">
        <Searchbar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          placeholder={'Search for a username...'}
          clearQuery={clearQuery}
        />
        <DropdownList />
      </div>

      <table className="content-table">
        <thead>
          <tr>
            <th>
              <h4>Identification</h4>
            </th>
            <th>
              <h4>Dealer ID</h4>
            </th>
            <th>
              <h4>Name</h4>
            </th>

            <th>
              <h4>Username</h4>
            </th>

            <th>
              <h4>Created</h4>
            </th>

            <th>
              <h4>State</h4>
            </th>
            <th>
              <h4>Dashboard</h4>
            </th>
          </tr>
        </thead>
      </table>
      {displayUsers()}

      {modalActive ? (
        <Modal
          modalActive={modalActive}
          setModalActive={setModalActive}
          text={text}
          heading={heading}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default HomeAdmin;
