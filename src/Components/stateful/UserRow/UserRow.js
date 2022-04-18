import './UserRow.css';
import formatDate from '../../../utils/Format.js';
import dashboardIcon from '../../../Assets/Images/dashboard-icon.png';
import edit_icon from '../../../Assets/Images/edit-icon.png';
import { Link } from 'react-router-dom';
import UserDialog from '../../../Components/stateful/UserDialog/UserDialog.js';
import { useState } from 'react';

const UserRow = ({ user }) => {
  const { id, dealerId, name, username, state, createdAt } = user;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogHandler = () => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };
  return (
    <>
      <table className="content-table">
        <tbody className="user-row">
          <tr>
            <td className="desktop-content">{id}</td>
            <td>{dealerId}</td>
            <td>{name}</td>
            <td className="desktop-content">{username}</td>
            <td className="desktop-content">{formatDate(createdAt)}</td>
            <td>{state}</td>
            <td>
              <img src={edit_icon} alt="Edit user" onClick={dialogHandler} />
            </td>
            <td>
              <Link to={`users/${dealerId}`}>
                <img src={dashboardIcon} alt="dashboard" />{' '}
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
