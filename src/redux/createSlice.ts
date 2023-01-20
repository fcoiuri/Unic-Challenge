import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUser,
  signIn,
  getUsers,
  searchUser,
  updateUser,
  deleteUser
} from 'redux/module/UsersService';
import {
  IUsersState,
  IUsersForm,
  ApiStatus,
  ISignIn,
  IUserLogged,
  IUserFormUpdate
} from 'redux/module/Users.type';
import { toastSuccess } from 'components/ToastifyConfig';

const initialState: IUsersState = {
  users: [],
  usersStatus: ApiStatus.ideal,
  registerUser: ApiStatus.ideal,
  signIn: ApiStatus.ideal,
  user: {} as IUserLogged
};

export const registerUserAction = createAsyncThunk(
  'users/signIn',
  async (data: IUsersForm) => {
    const response = await registerUser(data);
    return response.data;
  }
);

export const signInAction = createAsyncThunk(
  'users/registerUserState',
  async (data: ISignIn) => {
    const response = await signIn(data);
    return response.data;
  }
);

export const getAllUsersAction = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    const response = await getUsers();
    return response.data;
  }
);

export const searchUserAction = createAsyncThunk(
  'users/searching',
  async (user: string) => {
    const response = await searchUser(user);
    return response.data;
  }
);

export const updateUserAction = createAsyncThunk(
  'user/update',
  async ({ id, user }: IUserFormUpdate) => {
    const response = await updateUser(id, user);
    return response.data;
  }
);

export const deleteUserAction = createAsyncThunk(
  'user/delete',
  async (id: number) => {
    await deleteUser(id);
    return id;
  }
);

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetRegisterUser: (state) => {
      state.registerUser = ApiStatus.ideal;
    },
    logout: (state) => {
      state.signIn = ApiStatus.ideal;
    }
  },
  extraReducers: (state) => {
    state.addCase(registerUserAction.pending, (state) => {
      state.registerUser = ApiStatus.loading;
    });

    state.addCase(registerUserAction.fulfilled, (state) => {
      state.registerUser = ApiStatus.success;
      toastSuccess('Usuário criado!');
    });

    state.addCase(registerUserAction.rejected, (state, data) => {
      state.registerUser = ApiStatus.error;
      toastSuccess('Ocorreu algum erro na criação do usuário.');
    });

    state.addCase(signInAction.pending, (state) => {
      state.signIn = ApiStatus.loading;
    });

    state.addCase(signInAction.fulfilled, (state, data) => {
      state.signIn = ApiStatus.success;
      state.user = data.payload!;
      toastSuccess('Login efetuado com sucesso!');
    });

    state.addCase(signInAction.rejected, (state) => {
      state.signIn = ApiStatus.error;
      toastSuccess('Ocorreu algum erro no login...');
    });

    state.addCase(getAllUsersAction.pending, (state) => {
      state.signIn = ApiStatus.loading;
    });

    state.addCase(getAllUsersAction.fulfilled, (state, data) => {
      state.usersStatus = ApiStatus.ideal;
      state.users = data.payload!;
    });

    state.addCase(getAllUsersAction.rejected, (state) => {
      state.signIn = ApiStatus.error;
      toastSuccess('Ocorreu algum erro no login...');
    });

    state.addCase(searchUserAction.pending, (state) => {
      state.signIn = ApiStatus.loading;
    });

    state.addCase(searchUserAction.fulfilled, (state, data) => {
      state.usersStatus = ApiStatus.ideal;
      state.users = data.payload!;
    });

    state.addCase(searchUserAction.rejected, (state) => {
      state.signIn = ApiStatus.error;
      toastSuccess('Ocorreu algum erro no login...');
    });
    state.addCase(updateUserAction.pending, (state) => {
      state.signIn = ApiStatus.loading;
    });

    state.addCase(updateUserAction.fulfilled, (state, data) => {
      state.usersStatus = ApiStatus.ideal;
      toastSuccess('Usuário atualizado');
    });

    state.addCase(updateUserAction.rejected, (state) => {
      state.signIn = ApiStatus.error;
      toastSuccess('Ocorreu algum erro na requisição...');
    });
    state.addCase(deleteUserAction.fulfilled, (state, data) => {
      const removeUser = state.users.filter((x) => x.id !== data.payload);
      state.users = removeUser;
      toastSuccess('Usuário deletado!');
    });
  }
});

export default slice.reducer;
export const { resetRegisterUser, logout } = slice.actions;
