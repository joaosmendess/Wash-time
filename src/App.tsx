import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Dashboard from './pages/Dashboard';
import WashTypes from './pages/WashTypes';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { auth } from './firebaseConfig';

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {location.pathname !== '/login' && user && <NavBar />}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/wash-types"
          element={<PrivateRoute element={<WashTypes />} />}
        />
        <Route
          path="/bookings"
          element={<PrivateRoute element={<Bookings />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
