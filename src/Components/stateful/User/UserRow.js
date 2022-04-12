import './UserRow.css';
import formatDate from '../../../utils/Format.js';
import dashboardIcon from '../../../Assets/Images/dashboard-icon.png';
import { Link } from 'react-router-dom';

const UserRow = ({ user }) => {
  const { id, dealerId, name, username, createdAt } = user;

  return (
    <table className="content-table">
      <tbody className="user-row">
        <tr>
          <td>{id}</td>
          <td>{dealerId}</td>
          <td>{name}</td>
          <td>{username}</td>
          <td>{formatDate(createdAt)}</td>
          <td>{'Active'}</td>
          <td>
            <Link to={`users/${dealerId}`}>
              <img src={dashboardIcon} alt="dashboard" />{' '}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserRow;
