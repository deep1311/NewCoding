import { Routes, Route, BrowserRouter as Router, Navigate, Outlet } from 'react-router-dom';
import { Home, Login } from '@/pages';
import { Footer, Header, Sidebar } from '@/layout';


const useAuth = () => {
  const token = localStorage.getItem('accessToken');
  return token !== null;
};

const PrivateOutlet = () => {
  const isAuth = useAuth();
  return isAuth ? (
    <>
      <Header />
      <Sidebar />
      {/* This will render the matched child route component. */}
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
};

const PublicRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/home" /> : <Outlet />;
};

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateOutlet />}>
          <Route path="/home" element={<Home />} />
          {/* Add other private routes here */}
        </Route>

        {/* If you have an error page */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  );
};

export default Routers;
