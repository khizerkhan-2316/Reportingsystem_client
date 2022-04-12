import './NoMatch.css';
import { Link } from 'react-router-dom';
const NoMatch = () => {
  return (
    <div className={'not-found-main-container'}>
      <div className="not-found-content">
        <h1>404</h1>
        <p>The ressource was not found</p>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};

export default NoMatch;
