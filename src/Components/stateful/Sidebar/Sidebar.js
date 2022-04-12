import './Sidebar.css';
import homeIcon from '../../../Assets/Images/home-icon.png';
import criteoIcon from '../../../Assets/Images/Criteo-Logo.png';
import googleIcon from '../../../Assets/Images/google-logo.webp';
import MenuItem from '../MenuItem/MenuItem.js';
const Sidebar = () => {
  return (
    <aside>
      <ul className="sidebar-list">
        <MenuItem img={homeIcon} alt="home" heading="Home" path="/admin" />
        <MenuItem
          img={homeIcon}
          alt="Reports"
          heading="Reportingview"
          path="/admin/reports"
        />
        <MenuItem
          img={homeIcon}
          alt="home"
          heading="Criteo"
          path="/admin/criteo"
        />
        <MenuItem
          img={homeIcon}
          alt="Home"
          heading="Google Ads"
          path="/admin/googleads"
        />
        <MenuItem
          img={homeIcon}
          alt="home"
          heading="Options"
          path="admin/options"
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
