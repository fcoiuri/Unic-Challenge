import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  CssBaseline,
  InputBase,
  Drawer as MuiDrawer,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  Container,
  Grid,
  Paper,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  IconButton
} from '@mui/material/';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';
import { Notification } from 'components/Notification';
import {
  Menu,
  Search as SearchIcon,
  ChevronLeft,
  Person
} from '@mui/icons-material/';
import { MainListItems, SecondaryListItems } from 'pages/Dashboard/ListItems';
import { Users } from 'pages/Dashboard/Users';
import { useDispatch } from 'react-redux';
import { searchUserAction } from 'redux/createSlice';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    marginLeft: theme.spacing(3),
    width: '50vw'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  }
}));

export const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const [search, setSearch] = React.useState('');

  const { user } = useAppSelector((state: RootState) => state.users.user);

  const dispatch = useDispatch<AppDispatch>();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    dispatch(searchUserAction(search));
  }, [search, dispatch]);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              pr: '1vw'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '1vw',
                ...(open && { display: 'none' })
              }}
            >
              <Menu />
            </IconButton>
            <Grid display={{ xs: 'none', lg: 'block', md: 'block' }}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Bem-vindo
                <>{user?.firstName ? `, ${user?.firstName}!` : '!'}</>
              </Typography>
            </Grid>
            <Grid container direction="row" justifyContent="center">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={search}
                  onChange={handleSearch}
                  placeholder="Buscar Usu??rio???"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: 'none',
                ...(open && { display: 'none' })
              }}
            >
              <Person />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Users />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Notification />
    </React.Fragment>
  );
};
