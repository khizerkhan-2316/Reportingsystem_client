import './Report.css';
import { useState, useEffect } from 'react';
const Report = ({ reports }) => {
  useEffect(() => {}, []);

  const calculateMonth = (month) => {
    const date = new Date(month);

    return `${date.toLocaleString('dk-DK', {
      month: 'long',
      year: 'numeric',
    })}`;
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
              <td>Data</td>
            </tr>

            <tr>
              <td>Eksponeringer</td>
              <td>Data</td>
            </tr>

            <tr>
              <td>Klik</td>
              <td>Data</td>
            </tr>
            <tr>
              <td>Forbrug</td>
              <td>Data</td>
            </tr>

            <tr>
              <th>
                <h4>Konverteringer:</h4>
              </th>
              <th></th>
            </tr>

            <tr>
              <td>Emails/bestilt prøvetur</td>
              <td>Data</td>
            </tr>

            <tr>
              <td>Telefonopkald</td>
              <td>Data</td>
            </tr>

            <tr>
              <td>Se andre annoncer</td>
              <td>Data</td>
            </tr>

            <tr>
              <td>Delinger</td>
              <td>Data</td>
            </tr>

            <tr>
              <td>Kliks til hjemmeside</td>
              <td>Data</td>
            </tr>

            <tr>
              <td>Favoritmarkering</td>
              <td>Data</td>
            </tr>

            <tr>
              <th>
                <h4>Konvertering i alt:</h4>
              </th>
              <th>
                <h4>data</h4>
              </th>
            </tr>

            <tr>
              <th>
                <h4>Pris pr. konvertering:</h4>
              </th>
              <th>
                <h4>data</h4>
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
                    <td>{report.ctr}</td>
                  </tr>
                  <tr>
                    <td>{report.impressions}</td>
                  </tr>
                  <tr>
                    <td>{report.clicks}</td>
                  </tr>
                  <tr>
                    <td>{report.cost}</td>
                  </tr>
                  <tr>
                    <th>...</th>
                  </tr>
                  <tr>
                    <td>{report.mail}</td>
                  </tr>
                  <tr>
                    <td>{report.phone}</td>
                  </tr>
                  <tr>
                    <td>{report.otherAds}</td>
                  </tr>
                  <tr>
                    <td>{report.shared}</td>
                  </tr>
                  <tr>
                    <td>{report.clickHomepage}</td>
                  </tr>

                  <tr>
                    <td>{report.favorite}</td>
                  </tr>
                  <tr>
                    <th>{report.monthlyConversions}</th>
                  </tr>
                  <tr>
                    <th>{report.pricePerConversion}</th>
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
