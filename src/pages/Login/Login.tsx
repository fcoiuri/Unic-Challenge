import React from 'react';
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Typography,
  Box
} from '@mui/material/';
import { Background } from 'components/Background';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { Link, useNavigate } from 'react-router-dom';
import { ApiStatus, ISignIn } from 'redux/module/Users.type';
import { signInAction } from 'redux/createSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifyButton, setVerifyButton] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { signIn } = useAppSelector((state: RootState) => state.users);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ISignIn = {
      email,
      password
    };

    dispatch(signInAction(data));
  };

  React.useEffect(() => {
    if (ApiStatus.success === signIn) {
      setVerifyButton(true);
      // dispatch(resetRegisterUser());
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  }, [dispatch, navigate, signIn]);

  return (
    <Background title="Login">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmail}
        />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            value={password}
            onChange={handlePassword}
            required
            name="password"
            label="Senha"
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

        <Button
          type="submit"
          disabled={verifyButton}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#5C5CFF' }}
        >
          Entrar
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="subtitle1">
              <Link to="/signUP">Não tem uma conta? Crie uma</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Background>
  );
};
