import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState, useAppSelector } from 'redux/store';

export const PrivateRoutes: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.users);

  return user.accessToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
