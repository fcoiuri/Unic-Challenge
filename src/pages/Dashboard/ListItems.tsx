import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { Person, Logout, Dashboard, PersonAdd } from '@mui/icons-material/';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/createSlice';
import { ProfileDialog } from 'pages/ProfileDialog';

export const MainListItems: React.FC = () => {
  const [hasRender, setRender] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { user } = useAppSelector((state: RootState) => state.users);

  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/signUP');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleProfile = React.useCallback(() => {
    setRender(true);
    setOpen(true);
  }, []);

  return (
    <React.Fragment>
      <ListItemButton onClick={handleDashboard}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItemButton>
      <ListItemButton onClick={handleProfile}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Meu Perfil" />
      </ListItemButton>
      {hasRender && (
        <ProfileDialog
          open={open}
          setOpen={setOpen}
          adminValue={user.user?.admin!}
          emailValue={user.user?.email!}
          firstNameValue={user.user?.firstName!}
          id={user.user?.id!}
          lastNameValue={user.user?.lastName!}
        />
      )}
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
