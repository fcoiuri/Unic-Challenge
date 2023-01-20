import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TablePagination,
  Checkbox,
  Toolbar,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material/';
import { getAllUsersAction, deleteUserAction } from 'redux/createSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from 'redux/store';
import { alpha } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material/';
import { ToastContainer } from 'react-toastify';
import { ProfileDialog } from 'pages/ProfileDialog';
interface Column {
  label: string;
  id: 'firstName' | 'lastName' | 'email' | 'id' | 'password' | 'admin';
  minWidth?: number;
  align?: 'right';
  fontWeight: 'bold';
}

const columns: readonly Column[] = [
  { id: 'firstName', label: 'Nome', minWidth: 170, fontWeight: 'bold' },
  { id: 'lastName', label: 'Sobrenome', minWidth: 170, fontWeight: 'bold' },
  {
    id: 'email',
    label: 'E-mail',
    minWidth: 170,
    align: 'right',
    fontWeight: 'bold'
  }
];

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: number;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  numSelected,
  selected
}) => {
  const [hasRender, setRender] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [found, setFound] = React.useState<any>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useAppSelector((state: RootState) => state.users);

  React.useEffect(() => {
    setFound(users.find((item) => item.id === selected));
  }, [selected, users]);
  // const found = users.find((item) => item.id === selected);

  console.log(found);

  const handleEditUser = React.useCallback(() => {
    setRender(true);
    setOpen(true);
  }, []);

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              )
          })
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {found?.firstName} selecionado
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Usuários
          </Typography>
        )}
        {numSelected > 0 && (
          <React.Fragment>
            <Tooltip title="Editar" onClick={handleEditUser}>
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Deletar"
              onClick={() => {
                dispatch(deleteUserAction(selected));
              }}
            >
              <IconButton>
                <Delete />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
      </Toolbar>
      {hasRender && (
        <ProfileDialog
          open={open}
          setOpen={setOpen}
          adminValue={found?.admin!}
          emailValue={found?.email!}
          firstNameValue={found?.firstName!}
          id={selected}
          lastNameValue={found?.lastName!}
        />
      )}
    </React.Fragment>
  );
};

export const Users: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(0);
  const { users, user } = useAppSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    setSelectedId(Number(name));

    setSelected(name);
  };

  const isSelected = (id: number) => selectedId === id;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'auto' }}>
          {user.user?.admin && (
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selectedId}
            />
          )}
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {user.user?.admin && (
                    <TableCell
                      align="left"
                      style={{ minWidth: 100, fontWeight: 'bold' }}
                      padding="checkbox"
                    >
                      Selecionar
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: column.fontWeight
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id!);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        onClick={(event) =>
                          handleClick(event, row.id!.toString())
                        }
                      >
                        {user.user?.admin && (
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        )}

                        {columns.map((column) => {
                          const value = row[column.id!];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer autoClose={1800} hideProgressBar />
    </React.Fragment>
  );
};
