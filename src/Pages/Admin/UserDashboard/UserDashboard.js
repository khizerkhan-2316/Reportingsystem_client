import { useLoading } from '../../../Context/LoadingContext.js';
import Spinner from '../../../Components/stateless/Spinner/Spinner.js';
import { useEffect, useState } from 'react';
import Report from '../../../Components/stateless/Report/Report';
import ReportOverview from '../../../Components/stateless/ReportOverview/ReportOverview';

const UserDashboard = () => {
  const [reports, setReports] = useState(null);
  const { loading, setLoading } = useLoading();

  const getReportData = async () => {
    try {
      setLoading(true);

      const dealerId = localStorage.getItem('selectedDealerid');
      const data = await fetch(
        `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/reports/${dealerId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem(
              process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY
            )}`,
          },
        }
      );
      const reports = await data.json();
      setReports(reports.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  return (
    <>
      <div className="homeuser">
        <h2>Overblik:</h2>
        {reports && <ReportOverview reports={reports} />}
        <h2>Detaljeret: </h2>
        {reports && <Report reports={reports} />}
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default UserDashboard;
