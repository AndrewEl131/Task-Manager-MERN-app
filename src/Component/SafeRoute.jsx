import React from 'react';
import useUserStore from '../store/useUserStore';
import { Navigate } from 'react-router-dom';

export default function SafeRoute({ children }) {
  const { isAuth, loading } = useUserStore();

  if (loading) return <div>Loading...</div>; // Optional if you handle async login
  if (!isAuth) return <Navigate to="/Auth" replace />; // Redirect if not logged in

  // children must be wrapped in a fragment if multiple elements
  return <>{children}</>;
}
