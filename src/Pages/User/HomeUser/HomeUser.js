import './HomeUser.css';
import { getData } from '../../../utils/UserRequests.js';
import { useEffect, useState } from 'react';
import Report from '../../../Components/stateless/Report/Report';
import ReportOverview from '../../../Components/stateless/ReportOverview/ReportOverview';
import Button from '../../../Components/stateless/Button/Button';

const HomeUser = ({
  setUserAutenticated,
  userAutenticated,
  adminAutenticated,
  setAdminAuthenticated,
}) => {
  const [userData, setUserData] = useState('');
  const [reports, setReports] = useState(null);
  const [isReportsFetched, setIsReportsFetched] = useState(false);

  const loadAllData = async () => {
    const data = await getData(
      localStorage.getItem(process.env.REACT_APP_USER_ACCESS_TOKEN_KEY),
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users/profile`
    );

    setUserData(data);
  };

  const reportHandler = async () => {
    if (userData !== '') {
      const reports = await getData(
        localStorage.getItem(process.env.REACT_APP_USER_ACCESS_TOKEN_KEY),
        `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/reports/${userData.dealerId}`
      );

      setReports(reports.data);
      setIsReportsFetched(true);
    }
  };

  useEffect(() => {
    loadAllData();
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
    <div className="homeuser">
      <h1>Welcome {userData.name}</h1>

      <h2>Overblik:</h2>
      {reports && <ReportOverview reports={reports} />}

      <h2>Detaljeret: </h2>
      {reports && <Report reports={reports} />}

      <Button onClick={reportHandler} disabled={isReportsFetched}>
        Fetch Reports
      </Button>

      <Button onClick={logoutHandler}>Log out</Button>
    </div>
  );
};

export default HomeUser;
