import './HomeAdmin.css';
import { getData } from '../../../utils/UserRequests.js';
import { useEffect, useState } from 'react';
import Searchbar from '../../../Components/stateful/Searchbar/Searchbar.js';
import UserRow from '../../../Components/stateful/UserRow/UserRow.js';
import Modal from '../../../Components/stateful/Modal/Modal.js';
import DropdownList from '../../../Components/stateful/Dropdownlist/DropdownList.js';
import { useLoading } from '../../../Context/LoadingContext.js';
import Spinner from '../../../Components/stateless/Spinner/Spinner.js';
import { useMemo } from 'react';
import Pagination from '../../../Components/stateful/Pagination/Pagination.js';
let PageSize = 6;

const HomeAdmin = ({
  userAutenticated,
  adminAutenticated,
  setUserAutenticated,
}) => {
  const { loading, setLoading } = useLoading();
  const [adminData, setAdminData] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchInput, setSearchInput] = useState('');
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [isStateSelected, setIsStateSelected] = useState(false);
  const [stateSelected, setStateSelected] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return filteredUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredUsers]);

  const setError = (message, heading) => {
    setText(message);
    setHeading(heading);
    setModalActive(true);
  };

  const initializeAllRequests = () => {
    const data = getData(
      localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users/admin`
    );
    setLoading(true);
    data
      .then((data) => {
        setAdminData(data);
      })
      .catch((e) => {
        setError(e, 'Error');
      });
    const usersdata = getData(
      localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users`
    );

    usersdata
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })

      .catch((e) => {
        setError(e, 'Error');
      });
  };

  const noSearch = () => {
    return users !== '' && searchInput === '' && !isStateSelected;
  };

  const displayAllUsers = () => {
    return currentTableData.map((user) => (
      <UserRow key={user.dealerId} user={user} />
    ));
  };

  const searchAndFilter = () => {
    return users !== '' && searchInput !== '' && isStateSelected;
  };

  const displayBySearchAndFilter = () => {
    return currentTableData.map((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      user.state === stateSelected.toLowerCase() ? (
        <UserRow key={user.dealerId} user={user} />
      ) : (
        ''
      )
    );
  };

  const searchAndNoFilter = () => {
    return searchInput !== '' && !isStateSelected;
  };

  const displayBySearch = () => {
    return users.map((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) ? (
        <UserRow key={user.dealerId} user={user} />
      ) : (
        ''
      )
    );
  };

  const filterAndNoSearch = () => {
    return isStateSelected && searchInput === '';
  };

  const displayByFilter = () => {
    return currentTableData.map((user) =>
      user.state === stateSelected.toLowerCase() ? (
        <UserRow key={user.dealerId} user={user} />
      ) : (
        ''
      )
    );
  };
  const displayUsers = () => {
    try {
      return noSearch()
        ? displayAllUsers()
        : searchAndFilter()
        ? displayBySearchAndFilter()
        : searchAndNoFilter()
        ? displayBySearch()
        : filterAndNoSearch()
        ? displayByFilter()
        : null;
    } catch (e) {
      alert(e);
    }
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
          placeholder={'Search for a name...'}
          clearQuery={clearQuery}
        />
        <DropdownList
          isStateSelected={isStateSelected}
          setIsStateSelected={setIsStateSelected}
          stateSelected={stateSelected}
          setStateSelected={setStateSelected}
        />
      </div>

      {loading && <Spinner />}
      <table className="content-table">
        <thead>
          <tr>
            <th>
              <h4>Dealer ID</h4>
            </th>
            <th>
              <h4>Name</h4>
            </th>

            <th className="desktop-content">
              <h4>Username</h4>
            </th>

            <th className="desktop-content">
              <h4>Created</h4>
            </th>

            <th>
              <h4>State</h4>
            </th>

            <th>
              <h4>Edit</h4>
            </th>
            <th>
              <h4>Dashboard</h4>
            </th>
          </tr>
        </thead>
      </table>
      {users && displayUsers()}
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

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredUsers.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HomeAdmin;
