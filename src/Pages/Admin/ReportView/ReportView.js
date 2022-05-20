import './ReportView.css';
import { getData } from '../../../utils/UserRequests';
import ReportRow from '../../../Components/stateful/ReportRow/ReportRow';
import { useState, useEffect } from 'react';
import { useLoading } from '../../../Context/LoadingContext.js';
import Spinner from '../../../Components/stateless/Spinner/Spinner.js';

const ReportView = () => {
  const [reports, setReports] = useState('');
  const { loading, setLoading } = useLoading();

  const getMonthlyReports = async () => {
    try {
      setLoading(true);
      const reports = await getData(
        localStorage.getItem(process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY),
        `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/reports/month`
      );

      if (reports.success) {
        setReports(reports.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  useEffect(() => {
    getMonthlyReports();
  }, []);

  return (
    <>
      <h1 className="reportview-header">Reporting overview</h1>

      <div className="reportview-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>
                <h4>Start:</h4>
              </th>
              <th>
                <h4>FID</h4>
              </th>
              <th>
                <h4>Forhandler</h4>
              </th>
              <th>
                <h4>Aktiv</h4>
              </th>
              <th>
                <h4>Rapport udarbejdet</h4>
              </th>
              <th>
                <h4>Konsulent </h4>
              </th>
              <th>
                <h4>Note:</h4>
              </th>
            </tr>
          </thead>
        </table>

        {reports && reports.map((report) => <ReportRow report={report} />)}
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default ReportView;
