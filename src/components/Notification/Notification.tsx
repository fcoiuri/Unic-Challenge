import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, RootState } from 'redux/store';
import { ApiStatus } from 'redux/module/Users.type';

export const Notification: React.FC = () => {
  const { registerUser } = useAppSelector((state: RootState) => state.users);

  return (
    <React.Fragment>
      {registerUser === ApiStatus.success && (
        <ToastContainer autoClose={1800} hideProgressBar position="top-right" />
      )}
    </React.Fragment>
  );
};
