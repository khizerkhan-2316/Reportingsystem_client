import './Sidebar.css';
import homeIcon from '../../../Assets/Images/home-icon.png';
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
          heading="Dashboard"
          path="/admin/criteo"
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
