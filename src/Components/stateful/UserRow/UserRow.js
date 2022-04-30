import './UserRow.css';
import formatDate from '../../../utils/Format.js';
import dashboardIcon from '../../../Assets/Images/dashboard-icon.png';
import edit_icon from '../../../Assets/Images/edit-icon.png';
import { useNavigate } from 'react-router-dom';
import UserDialog from '../../../Components/stateful/UserDialog/UserDialog.js';
import { useState } from 'react';

const UserRow = ({ user }) => {
  const { dealerId, name, username, state, createdAt } = user;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogHandler = () => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate(`/admin/users/${dealerId}`);
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
              <img
                src={dashboardIcon}
                alt="dashboard"
                onClick={redirectHandler}
              />
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
