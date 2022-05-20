import formatDate from '../../../utils/Format';
import { useState, useEffect } from 'react';

const ReportRow = ({ report }) => {
  const { name, dealerId, state, createdAt } = report;

  const [start, setStart] = useState('');

  useEffect(() => {
    setStart(calculateStartPeriod(report.reports));
  }, []);

  const calculateStartPeriod = (reports) => {
    const startPeriod = reports[reports.length - 1].month;
    return startPeriod;
  };
  return (
    <table className="report-table">
      <tbody>
        <tr>
          <td>
            <p>{formatDate(start)}</p>
          </td>
          <td>
            <p>{dealerId}</p>
          </td>
          <td>
            <p>{name}</p>
          </td>
          <td>
            <p>{state}</p>
          </td>
          <td>
            <p>{formatDate(createdAt)}</p>
          </td>
          <td>
            <p>Konsulent </p>
          </td>
          <td>
            <p>Note:</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReportRow;
