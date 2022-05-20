import './CriteoDashboard.css';
import CriteoIcon from '../../../Assets/Images/Criteo-Logo.png';
import DonutChard from '../../../Components/stateful/DonutChart/DonutChart';
import { useState, useEffect } from 'react';
import { useLoading } from '../../../Context/LoadingContext.js';
import Spinner from '../../../Components/stateless/Spinner/Spinner.js';

const CriteoDashboard = (props) => {
  const [quarterRevenue, setQuarterRevenue] = useState('');
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    fetch(
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/criteo/stats/dashboard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem(
            process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY
          ),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setQuarterRevenue(data.data.revenue);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        <h1 className="criteodasbhoard-header">Criteo Dashboard</h1>
      </div>

      <div className="criteodashboard-container">
        <div className="dashboard">
          <div className="criteo-target-container">
            <div className="dashboard-icon-container">
              <img src={CriteoIcon} alt="icon" />
            </div>

            <div className="target-container">
              <DonutChard
                data={[quarterRevenue, 1000000]}
                revenueProp={quarterRevenue}
              />
            </div>
            <div className="Donut-chart-headers">
              <p>0</p>
              <p>1M</p>
            </div>
            <div className="dealer-spent">
              <h3>Biggest spent Q</h3>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default CriteoDashboard;
