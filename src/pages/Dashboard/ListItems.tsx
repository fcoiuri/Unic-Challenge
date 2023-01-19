import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { Person, Logout, Dashboard, PersonAdd } from '@mui/icons-material/';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/createSlice';

export const MainListItems: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/signUP');
  };

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Meu Perfil" />
      </ListItemButton>
      {user.user?.admin! && (
        <ListItemButton onClick={handleCreateUser}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="Cadastrar  Usuário" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};
export const SecondaryListItems: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItemButton>
    </React.Fragment>
  );
};
