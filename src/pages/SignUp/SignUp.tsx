import React, { ChangeEvent } from 'react';
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material/';
import { Background } from 'components/Background';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { Link } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Background title="Criar Conta">
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
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
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
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Criar conta
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant="subtitle1">
            <Link to="/">Já tem uma conta? Faça o Login</Link>
          </Typography>
        </Grid>
      </Grid>
    </Background>
  );
};
