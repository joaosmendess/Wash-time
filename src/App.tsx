import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WashTypes from './pages/WashTypes';
import Bookings from './pages/Bookings';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wash-types" element={<WashTypes />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </div>
  );
}

export default App;
