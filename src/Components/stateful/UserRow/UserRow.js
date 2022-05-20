import './UserRow.css';
import formatDate from '../../../utils/Format.js';
import dashboardIcon from '../../../Assets/Images/dashboard-icon.png';
import edit_icon from '../../../Assets/Images/edit-icon.png';
import { useNavigate } from 'react-router-dom';
import UserDialog from '../UpdateUser/UserDialog.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserRow = ({ user, setSelectedDealerId }) => {
  const { dealerId, name, username, state, createdAt } = user;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogHandler = () => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const redirectHandler = () => {
    localStorage.setItem('selectedDealerid', dealerId);
  };

  return (
    <>
      <table className="content-table">
        <tbody className="user-row">
          <tr>
            <td>{dealerId}</td>
            <td>{name}</td>
            <td className="desktop-content">{username}</td>
            <td className="desktop-content">{formatDate(createdAt)}</td>
            <td>{state}</td>
            <td>
              <img src={edit_icon} alt="Edit user" onClick={dialogHandler} />
            </td>
            <td>
              <Link to={`/admin/users`}>
                <img
                  src={dashboardIcon}
                  alt="dashboard"
                  onClick={redirectHandler}
                />{' '}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      {isDialogOpen ? (
        <UserDialog dialogHandler={dialogHandler} user={user} />
      ) : (
        ''
      )}
    </>
  );
};

export default UserRow;
