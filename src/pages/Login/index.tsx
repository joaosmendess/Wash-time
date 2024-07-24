// pages/Login.tsx
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Login</h2>
        {error && <p className="mb-4 text-red-500">{error.message}</p>}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          <FcGoogle className="mr-3 text-2xl" />
          {loading ? 'Entrando...' : 'Entrar com Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
