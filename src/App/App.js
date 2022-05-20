import './App.css';
import { LoadingProvider } from '../Context/LoadingContext';
import NoMatch from '../Pages/NoMatch/NoMatch.js';
import Navigationbar from '../Components/stateful/Navigationbar/Navigationbar.js';
import Sidebar from '../Components/stateful/Sidebar/Sidebar.js';
import LoginAdmin from '../Pages/Admin/LoginAdmin/LoginAdmin.js';
import HomeAdmin from '../Pages/Admin/HomeAdmin/HomeAdmin.js';
import LoginUser from '../Pages/User/LoginUser/LoginUser.js';
import HomeUser from '../Pages/User/HomeUser/HomeUser.js';
import OptionsAdmin from '../Pages/Admin/OptionsAdmin/OptionsAdmin.js';
import ReportView from '../Pages/Admin/ReportView/ReportView.js';
import CriteoDashboard from '../Pages/Admin/CriteoDashboard/CriteoDashboard';
import { isAuthenticated } from '../utils/Auth';
import { useState, useEffect } from 'react';
import UserDashboard from '../Pages/Admin/UserDashboard/UserDashboard';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

function App() {
  const [userAutenticated, setUserAutenticated] = useState(false);
  const [adminAutenticated, setAdminAuthenticated] = useState(false);

  useEffect(() => {
    setUserAutenticated(
      isAuthenticated(process.env.REACT_APP_USER_AUTENTICATED_KEY)
    );
    setAdminAuthenticated(
      isAuthenticated(process.env.REACT_APP_ADMIN_AUTENTICATED_KEY)
    );
  }, []);

  return (
    <section className="App-main-container">
      <LoadingProvider>
        <Router>
          {adminAutenticated && (
            <div className="nav-app-container">
              <Navigationbar setAdminAuthenticated={setAdminAuthenticated} />
            </div>
          )}

          {adminAutenticated && (
            <div className="side-app-container">
              <Sidebar />
            </div>
          )}

          <div className="app-main-content-container">
            <Routes>
              <Route
                exact
                path={`/`}
                element={
                  userAutenticated ? (
                    <HomeUser
                      setUserAutenticated={setUserAutenticated}
                      userAutenticated={userAutenticated}
                      adminAutenticated={adminAutenticated}
                      setAdminAuthenticated={setAdminAuthenticated}
                    />
                  ) : (
                    <Navigate to="/user-login" />
                  )
                }
              />

              <Route
                exact
                path="/user-login"
                element={
                  userAutenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <LoginUser
                      setUserAutenticated={setUserAutenticated}
                      setAdminAuthenticated={setAdminAuthenticated}
                    />
                  )
                }
              />

              <Route
                exact
                path={`/admin/users`}
                element={
                  adminAutenticated ? (
                    <UserDashboard />
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                exact
                path="/admin"
                element={
                  adminAutenticated ? (
                    <HomeAdmin
                      userAutenticated={userAutenticated}
                      adminAutenticated={adminAutenticated}
                      setUserAutenticated={setUserAutenticated}
                    />
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                exact
                path="/admin-login"
                element={
                  adminAutenticated ? (
                    <Navigate to="/admin" />
                  ) : (
                    <LoginAdmin
                      setAdminAuthenticated={setAdminAuthenticated}
                      setUserAutenticated={setUserAutenticated}
                    />
                  )
                }
              />

              <Route
                exact
                path="admin/options"
                element={
                  adminAutenticated ? (
                    <OptionsAdmin />
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />
              <Route
                exact
                path="admin/reports"
                element={
                  adminAutenticated ? (
                    <ReportView />
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />

              <Route
                exact
                path="admin/criteo"
                element={adminAutenticated ? <CriteoDashboard /> : ''}
              />

              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </LoadingProvider>
    </section>
  );
}

export default App;
