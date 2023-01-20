import React from 'react';
import {
  IconButton,
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button
} from '@mui/material/';
import { ModalProfile } from 'components/ModalProfile';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetRegisterUser, updateUserAction } from 'redux/createSlice';
import { IUserFormUpdate, IUser, ApiStatus } from 'redux/module/Users.type';

interface ProfileDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  adminValue: IUser | boolean;
  emailValue: IUser | string;
  firstNameValue: IUser | string;
  id: IUser | number;
  lastNameValue: IUser | string;
}

export const ProfileDialog: React.FC<ProfileDialogProps> = ({
  open,
  setOpen,
  adminValue,
  emailValue,
  firstNameValue,
  id,
  lastNameValue
}) => {
  const { registerUser } = useAppSelector((state: RootState) => state.users);
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState(firstNameValue || '');
  const [email, setEmail] = React.useState(emailValue || '');
  const [lastName, setLastName] = React.useState(lastNameValue || '');
  const [password, setPassword] = React.useState('');
  const [verifyButton, setVerifyButton] = React.useState(false);
  console.log(email);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user: IUser = {
      email: String(email),
      password: password,
      firstName: String(firstName),
      lastName: String(lastName),
      admin: Boolean(adminValue)
    };

    const sendData: IUserFormUpdate = {
      id: Number(id),
      user
    };
    dispatch(updateUserAction(sendData));
  };

  React.useEffect(() => {
    if (ApiStatus.success === registerUser) {
      dispatch(resetRegisterUser());
      setVerifyButton(true);
    }
  }, [dispatch, navigate, registerUser]);

  return (
    <React.Fragment>
      <ModalProfile
        title="Editar Perfil"
        setModalOpen={setOpen}
        modalState={open}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                value={firstName}
                onChange={handleFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={handleLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={handlePassword}
                  required
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={verifyButton}
              sx={{ mt: 3, ml: 2, backgroundColor: '#5C5CFF' }}
            >
              Atualizar perfil
            </Button>
          </Grid>
        </Box>
      </ModalProfile>
    </React.Fragment>
  );
};
