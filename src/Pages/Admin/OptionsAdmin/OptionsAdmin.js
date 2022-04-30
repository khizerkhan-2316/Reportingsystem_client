import './OptionsAdmin.css';
import Button from '../../../Components/stateless/Button/Button.js';
const OptionAdmin = (props) => {
  return (
    <div className="OptionsAdmin-container">
      <div className="Options-container">
        <h1>Admin options</h1>
      </div>
      <div className="Options-container">
        <div className="Option">
          <h2>Admin</h2>

          <div className="specific-option">
            <p>Update your details!</p>
            <Button>Update</Button>
          </div>
        </div>

        <div className="Option">
          <h2>Users</h2>

          <div className="specific-option">
            <p>Create a new user</p>
            <Button>Create</Button>
          </div>

          <div className="specific-option">
            <p>Update a specefic users password</p>
            <Button>Update</Button>
          </div>

          <div className="specific-option">
            <p>Update All Users</p>
            <Button>Update</Button>
          </div>
        </div>

        <div className="Option">
          <h2>Criteo</h2>

          <div className="specific-option">
            <p>Insert monthly stats for Criteo in Database</p>
            <Button>Insert</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionAdmin;
