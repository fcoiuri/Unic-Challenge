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
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box
} from '@mui/material/';
import { Background } from 'components/Background';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUserState } from 'redux/createSlice';
import { IUsersForm } from 'redux/module/Users.type';
import { AppDispatch } from 'redux/store';

export const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [admin, setAdmin] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin(e.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: IUsersForm = {
      email,
      password,
      firstName,
      lastName,
      admin
    };

    dispatch(registerUserState(data));
  };

  return (
    <Background title="Criar Conta">
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
              onChange={handleLastname}
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
          <Grid item xs={12} container justifyContent="flex-start">
            <FormControlLabel
              control={
                <Checkbox
                  checked={admin}
                  onChange={handleAdmin}
                  sx={{
                    color: '#5C5CFF',
                    '&.Mui-checked': {
                      color: '#5C5CFF'
                    }
                  }}
                />
              }
              label="Admin"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#5C5CFF' }}
        >
          Criar conta
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="subtitle1">
              <Link to="/">Já tem uma conta? Faça o Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Background>
  );
};
