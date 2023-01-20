import React from 'react';
import { Avatar, CssBaseline, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer } from 'react-toastify';

interface BackgroundProps {
  title: string;
  children: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ title, children }) => {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#5C5CFF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" data-testid="title">
            {title}
          </Typography>

          {children}
        </Box>
      </Container>
      <ToastContainer autoClose={1800} hideProgressBar />
    </React.Fragment>
  );
};
