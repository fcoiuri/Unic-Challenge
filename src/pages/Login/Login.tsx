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

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Background title="Login">
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
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
    </Background>
  );
};
