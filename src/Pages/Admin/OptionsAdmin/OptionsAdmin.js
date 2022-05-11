import './OptionsAdmin.css';
import CreateUser from '../../../Components/stateful/CreateUser/CreateUser.js';
import Button from '../../../Components/stateless/Button/Button.js';
import Modal from '../../../Components/stateful/Modal/Modal.js';
import { insertCriteoStats } from '../../../utils/admin/CriteoRequests.js';
import { insertAnalyticsStats } from '../../../utils/admin/AnalyticsRequest.js';
import { useLoading } from '../../../Context/LoadingContext.js';
import Spinner from '../../../Components/stateless/Spinner/Spinner.js';
import { updateAllUsers } from '../../../utils/UserRequests.js';
import AdminCard from '../../../Components/stateful/AdminCard/AdminCard.js';

import { useState } from 'react';
const OptionAdmin = (props) => {
  const { loading, setLoading } = useLoading();

  const [isCreatedUserModalOpen, setIsCreatedUserModalOpen] = useState(false);
  const [isCreatedAdminModalOpen, setIsCreatedAdminModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');

  const buttonHandler = (dispatch) => {
    dispatch(true);
  };

  const insertCriteoStatsHandler = async () => {
    try {
      setLoading(true);
      const response = await insertCriteoStats(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY)
      );

      const jsonResponse = await response.json();

      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      if (jsonResponse.success) {
        setText(jsonResponse.message);
        setHeading('Inserted!');
      }
    } catch (e) {
      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      setHeading('Error!');
      setText(e);
    }
  };

  const insertAnalyticsStatsHandler = async () => {
    try {
      setLoading(true);
      const response = await insertAnalyticsStats(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY)
      );

      const jsonResponse = await response.json();

      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      if (jsonResponse.success) {
        setText(jsonResponse.message);
        setHeading('Inserted!');
      }
    } catch (e) {
      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      setHeading('Error!');
      setText(e);
    }
  };

  const updateAllUsersHandler = async () => {
    setLoading(true);

    try {
      const response = await updateAllUsers(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY)
      );
      const jsonResponse = await response.json();
      buttonHandler(setIsMessageModalOpen);
      setLoading(false);

      if (jsonResponse.success) {
        setText(jsonResponse.message);
        setHeading('Updated users!');
      } else {
        setText('Uanble to update users!');
        setHeading('Try inserting monthly stats!');
      }
    } catch (e) {
      setLoading(false);
      setText(e);
      setHeading('Error!');
    }
  };

  return (
    <>
      <div className="OptionsAdmin-container">
        <div className="Options-container">
          <h1>Admin options</h1>
        </div>
        <div className="Options-container">
          <div className="Option">
            <h2>Admin</h2>

            <div className="specific-option">
              <p>Create new Admin Login</p>
              <Button
                onClick={() => {
                  buttonHandler(setIsCreatedAdminModalOpen);
                }}
              >
                Create
              </Button>
              {isCreatedAdminModalOpen && (
                <AdminCard
                  isCreatedAdminModalOpen={isCreatedAdminModalOpen}
                  setIsCreatedAdminModalOpen={setIsCreatedAdminModalOpen}
                />
              )}
            </div>

            <div className="specific-option">
              <p>Update your details!</p>
              <Button>Update</Button>
            </div>
          </div>

          <div className="Option">
            <h2>Users</h2>

            <div className="specific-option">
              <p>Create a new user</p>
              <Button
                onClick={() => {
                  buttonHandler(setIsCreatedUserModalOpen);
                }}
              >
                Create
              </Button>
              {isCreatedUserModalOpen && (
                <CreateUser
                  isCreatedUserModalOpen={isCreatedUserModalOpen}
                  setIsCreatedUserModalOpen={setIsCreatedUserModalOpen}
                />
              )}
            </div>

            <div className="specific-option">
              <p>Update All Users</p>
              <Button onClick={updateAllUsersHandler}>Update</Button>
            </div>
          </div>

          <div className="Option">
            <h2>Criteo</h2>

            <div className="specific-option">
              <p>Insert previous month stats for Criteo in DB</p>
              <Button
                onClick={() => {
                  insertCriteoStatsHandler();
                }}
              >
                Insert
              </Button>
            </div>

            <div className="specific-option">
              <p>Insert previous month Google analytics in DB</p>
              <Button onClick={insertAnalyticsStatsHandler}>Insert</Button>
            </div>

            <div className="specific-option">
              <p>Create Criteo Reports</p>
              <Button>Create</Button>
            </div>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
      {isMessageModalOpen && (
        <Modal
          modalActive={isMessageModalOpen}
          setModalActive={setIsMessageModalOpen}
          text={text}
          heading={heading}
        />
      )}
    </>
  );
};

export default OptionAdmin;
