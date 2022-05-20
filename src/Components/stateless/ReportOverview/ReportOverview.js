import './ReportOverview.css';
import { useEffect, useState } from 'react';

const ReportOverview = ({ reports }) => {
  const [period, setPeriod] = useState('');
  const [CTR, setCTR] = useState('');
  const [impressions, setImpressions] = useState('');
  const [clicks, setClicks] = useState('');
  const [cost, setCost] = useState('');
  const [conversions, setConversions] = useState('');
  const [pricePerConversion, setPricePerConversion] = useState('Loading...');

  const calculatePeriod = (reports) => {
    const startDate = new Date(reports[0].month);
    const endDate = new Date(reports[reports.length - 1].month);

    return `${startDate.toLocaleString('dk-DK', {
      month: 'long',
      year: 'numeric',
    })} - ${endDate.toLocaleString('dk-DK', {
      month: 'long',
      year: 'numeric',
    })}`;
  };
  //
  const formatNumber = (number) => {
    return number.toLocaleString('dk-DK', { maximumFractionDigits: 2 });
  };

  const calculateDataFromReport = (reports, attribute) => {
    let total = 0;

    reports.forEach((report) => {
      total += report[attribute];
    });
    return total;
  };

  const calculatePricePerConversion = (cost, conversions) => {
    if (conversions === 0) {
      return 0;
    }
    const price = (cost / conversions).toFixed(2);
    return `${price} kr`;
  };

  const calculateCTR = (clicks, impressions) => {
    return (clicks / impressions) * 100;
  };
  useEffect(() => {
    setPeriod(calculatePeriod(reports));
    setImpressions(calculateDataFromReport(reports, 'impressions'));
    setClicks(calculateDataFromReport(reports, 'clicks'));
    setCost(calculateDataFromReport(reports, 'cost'));
    setConversions(calculateDataFromReport(reports, 'monthlyConversions'));
    setPricePerConversion(calculatePricePerConversion(cost, conversions));
    setCTR(calculateCTR(clicks, impressions));
  }, [cost, conversions]);

  return (
    <>
      <table className="reporting-overview">
        <thead>
          <tr>
            <th>
              <h4>Periode:</h4>
            </th>
            <th>
              <h4>{period}</h4>
            </th>
          </tr>
        </thead>
      </table>

      <table className="reporting-overview">
        <thead>
          <tr>
            <th>
              <h4>Nøgletal:</h4>
            </th>
            <th>
              <h4>Criteo</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CTR:</td>
            <td>{formatNumber(CTR)} %</td>
          </tr>

          <tr>
            <td>Eksponeringer:</td>
            <td>{formatNumber(impressions)}</td>
          </tr>

          <tr>
            <td>Klik:</td>
            <td>{formatNumber(clicks)}</td>
          </tr>
          <tr>
            <td>Forbrug:</td>
            <td>{formatNumber(cost)}</td>
          </tr>
          <tr>
            <td>Konverteringer:</td>
            <td>{conversions}</td>
          </tr>
        </tbody>
      </table>

      <table className="reporting-overview">
        <thead>
          <tr>
            <th>
              <h4>Pris pr. konvertering:</h4>
            </th>
            <th>
              <h4>{`${formatNumber(pricePerConversion)} kr`}</h4>
            </th>
          </tr>
        </thead>
      </table>
    </>
  );
};

export default ReportOverview;
