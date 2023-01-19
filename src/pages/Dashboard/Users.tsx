import * as React from 'react';
import Link from '@mui/material/Link';
import {
  Table,
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material/';
import { getAllUsersAction } from 'redux/createSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';
import { ApiStatus } from 'redux/module/Users.type';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
export const Users: React.FC = () => {
  const { users, usersStatus } = useAppSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="center">Sobrenome</TableCell>
            <TableCell align="right">E-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersStatus === ApiStatus.loading && <CircularProgress />}
          {usersStatus === ApiStatus.error && (
            <React.Fragment>Error while loading list</React.Fragment>
          )}
          {usersStatus === ApiStatus.ideal &&
            users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="right">{`${row.email}`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
};
