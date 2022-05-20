import './Report.css';
import { useState, useEffect } from 'react';
const Report = ({ reports }) => {
  const [totalCTR, setTotalCTR] = useState('');
  const [totalImpressions, setTotalImpressions] = useState('');
  const [totalClicks, setTotalClicks] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [totalMail, setTotalMail] = useState('');
  const [totalPhone, setTotalPhone] = useState('');
  const [totalOtherAds, setTotalOtherAds] = useState('');
  const [totalShared, setTotalShared] = useState('');
  const [totalClickHomepage, setTotalClickHomepage] = useState('');
  const [totalFavorite, setTotalFavorite] = useState('');
  const [totalMonthlyConversions, setTotalMonthlyConversions] = useState('');
  const [totalPricePerConversion, setTotalPricePerConversion] = useState('');

  useEffect(() => {
    setTotalImpressions(calculateTotalData(reports, 'impressions'));
    setTotalClicks(calculateTotalData(reports, 'clicks'));
    setTotalCost(calculateTotalData(reports, 'cost'));
    setTotalMail(calculateTotalData(reports, 'mail'));
    setTotalPhone(calculateTotalData(reports, 'phone'));
    setTotalOtherAds(calculateTotalData(reports, 'otherAds'));
    setTotalShared(calculateTotalData(reports, 'shared'));
    setTotalClickHomepage(calculateTotalData(reports, 'clickHomepage'));
    setTotalFavorite(calculateTotalData(reports, 'favorite'));
    setTotalMonthlyConversions(
      calculateTotalData(reports, 'monthlyConversions')
    );
    setTotalPricePerConversion(
      calculateTotalPricePerConversion(totalCost, totalMonthlyConversions)
    );
    setTotalCTR(calculateTotalCTR(totalClicks, totalImpressions));
  }, [totalCost, totalMonthlyConversions]);

  const calculateTotalPricePerConversion = (cost, conversions) => {
    if (conversions === 0) {
      return 0;
    }
    return (cost / conversions).toFixed(2);
  };
  const calculateMonth = (month) => {
    const date = new Date(month);

    return `${date.toLocaleString('dk-DK', {
      month: 'long',
      year: 'numeric',
    })}`;
  };

  const calculateTotalData = (reports, attribute) => {
    let counter = 0;

    reports.forEach((report) => (counter += report[attribute]));
    return counter;
  };

  const calculateTotalCTR = (totalClicks, totalImpressions) => {
    return (totalClicks / totalImpressions) * 100;
  };

  const formatNumber = (number) => {
    return number.toLocaleString('dk-DK', { maximumFractionDigits: 2 });
  };

  return (
    <>
      <div className="reports-container">
        <table className="reporting-overview" id="report-table">
          <thead>
            <tr>
              <th></th>
              <th>
                <h4>Total</h4>
              </th>
            </tr>
            <tr>
              <th>
                <h4>Visninger og forbrug:</h4>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CTR</td>
              <td>{formatNumber(totalCTR)} %</td>
            </tr>

            <tr>
              <td>Eksponeringer</td>
              <td>{formatNumber(totalImpressions)}</td>
            </tr>

            <tr>
              <td>Klik</td>
              <td>{formatNumber(totalClicks)}</td>
            </tr>
            <tr>
              <td>Forbrug</td>
              <td>{formatNumber(totalCost)}</td>
            </tr>

            <tr>
              <th>
                <h4>Konverteringer:</h4>
              </th>
              <th></th>
            </tr>

            <tr>
              <td>Emails/bestilt prøvetur</td>
              <td>{formatNumber(totalMail)}</td>
            </tr>

            <tr>
              <td>Telefonopkald</td>
              <td>{formatNumber(totalPhone)}</td>
            </tr>

            <tr>
              <td>Se andre annoncer</td>
              <td>{formatNumber(totalOtherAds)}</td>
            </tr>

            <tr>
              <td>Delinger</td>
              <td>{formatNumber(totalShared)}</td>
            </tr>

            <tr>
              <td>Kliks til hjemmeside</td>
              <td>{formatNumber(totalClickHomepage)}</td>
            </tr>

            <tr>
              <td>Favoritmarkering</td>
              <td>{formatNumber(totalFavorite)}</td>
            </tr>

            <tr>
              <th>
                <h4>Konvertering i alt:</h4>
              </th>
              <th>
                <h4>{formatNumber(totalMonthlyConversions)}</h4>
              </th>
            </tr>

            <tr>
              <th>
                <h4>Pris pr. konvertering:</h4>
              </th>
              <th>
                <h4>{formatNumber(totalPricePerConversion)} kr</h4>
              </th>
            </tr>
          </tbody>
        </table>

        {reports &&
          reports.map((report) => {
            return (
              <table className="reporting-overview" id="report-table">
                <thead>
                  <tr>
                    <th>{calculateMonth(report.month)}</th>
                  </tr>
                  <tr>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatNumber(report.ctr)} %</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.impressions)}</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.clicks)}</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(Math.round(report.cost))}</td>
                  </tr>
                  <tr>
                    <th>...</th>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.mail)}</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.phone)}</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.otherAds)}</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.shared)}</td>
                  </tr>
                  <tr>
                    <td>{formatNumber(report.clickHomepage)}</td>
                  </tr>

                  <tr>
                    <td>{formatNumber(report.favorite)}</td>
                  </tr>
                  <tr>
                    <th>{formatNumber(report.monthlyConversions)}</th>
                  </tr>
                  <tr>
                    <th>{`${formatNumber(report.pricePerConversion)} kr`} </th>
                  </tr>
                </tbody>
              </table>
            );
          })}
      </div>
    </>
  );
};

export default Report;
