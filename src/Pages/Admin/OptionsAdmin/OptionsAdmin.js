import './OptionsAdmin.css';
import CreateUser from '../../../Components/stateful/CreateUser/CreateUser.js';
import Button from '../../../Components/stateless/Button/Button.js';
import Modal from '../../../Components/stateful/Modal/Modal.js';
import { insertCriteoStats } from '../../../utils/admin/CriteoRequests.js';
import { insertAnalyticsStats } from '../../../utils/admin/AnalyticsRequest.js';
import { createReports } from '../../../utils/admin/ReportRequests.js';
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
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');

  const buttonHandler = (dispatch) => {
    dispatch(true);
  };

  const dateHandler = (e, dispatch) => {
    dispatch(e.target.value);
  };

  const insertPreviousMonthCriteoStats = async () => {
    try {
      setLoading(true);
      const response = await insertCriteoStats(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
        '/api/criteo/stats',
        'POST'
      );
      const jsonResponse = await response.json();

      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      if (jsonResponse.success) {
        setText(jsonResponse.message);
        setHeading(jsonResponse.heading);
      }
    } catch (e) {
      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      setHeading('Error!');
      setText(e);
    }
  };

  const createReportHandler = async () => {
    try {
      setLoading(true);
      const response = await createReports(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY)
      );
      const jsonResponse = await response.json();

      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      if (jsonResponse.success) {
        setText(jsonResponse.message);
        setHeading(jsonResponse.heading);
      }
    } catch (e) {
      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      setHeading('Error!');
      setText(e);
    }
  };

  const insertSpeceficMonthCriteoStats = async () => {
    if (!validateDates(startdate, enddate)) {
      const text =
        '1. Check if you have chosen both start and enddate.\n' +
        '\n2. Check if the chosen month is not the current month.\n' +
        '\n3. Check if the first and last day of the specefic month is chosen.\n';
      buttonHandler(setIsMessageModalOpen);
      setText(text);
      setHeading('Error!');
      return;
    }
    try {
      setLoading(true);
      const response = await insertCriteoStats(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
        `/api/criteo/stats?startdate=${startdate}&enddate=${enddate}`,
        'GET'
      );
      const jsonResponse = await response.json();

      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      if (jsonResponse.success) {
        setText(jsonResponse.message);
        setHeading(jsonResponse.heading);
      }
    } catch (e) {
      buttonHandler(setIsMessageModalOpen);
      setLoading(false);
      setHeading('Error!');
      setText(e);
    }
  };

  const validateDates = (startdate, enddate) => {
    const date = new Date();

    const dateMonth = new Date(startdate).getMonth();

    return startdate === '' || enddate === ''
      ? false
      : startdate > enddate
      ? false
      : dateMonth === date.getMonth()
      ? false
      : true;
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
        setHeading(jsonResponse.heading);
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
        setHeading(jsonResponse.heading);
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
              <Button onClick={insertPreviousMonthCriteoStats}>Insert</Button>
            </div>

            <div className="specific-option">
              <p>Insert previous month Google analytics in DB</p>
              <Button onClick={insertAnalyticsStatsHandler}>Insert</Button>
            </div>

            <div className="specific-option">
              <p>Create Criteo Reports</p>
              <Button onClick={createReportHandler}>Create</Button>
            </div>
          </div>
        </div>

        <div className="criteo-container">
          <h2>Insert previously monthly Criteo stats</h2>
          <p>
            Startdate should be the first day of the month and enddate should be
            the last day of the specefic month
          </p>
          <label>Startdate:</label>
          <input
            onChange={(e) => {
              dateHandler(e, setStartdate);
            }}
            type="date"
          />
          <label>Enddate:</label>
          <input
            onChange={(e) => {
              dateHandler(e, setEnddate);
            }}
            type="date"
          />
          <Button onClick={insertSpeceficMonthCriteoStats}>Submit</Button>
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
