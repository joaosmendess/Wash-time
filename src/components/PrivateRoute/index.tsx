// components/PrivateRoute.tsx
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebaseConfig';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
