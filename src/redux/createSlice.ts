import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from 'redux/module/UsersService';
import { IUsersState, IUsersForm, ApiStatus } from 'redux//module/Users.type';
import { toastSuccess } from 'components/ToastifyConfig';

const initialState: IUsersState = {
  list: [],
  registerUser: ApiStatus.ideal
};

export const registerUserState = createAsyncThunk(
  'users/registerUserState',
  async (data: IUsersForm) => {
    const response = await registerUser(data);
    return response.data;
  }
);

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetRegisterUser: (state) => {
      state.registerUser = ApiStatus.ideal;
    }
  },
  extraReducers: (state) => {
    state.addCase(registerUserState.pending, (state) => {
      state.registerUser = ApiStatus.loading;
    });
    state.addCase(registerUserState.fulfilled, (state) => {
      state.registerUser = ApiStatus.success;
      toastSuccess('Usuário criado!');
    });
    state.addCase(registerUserState.rejected, (state) => {
      state.registerUser = ApiStatus.error;
      toastSuccess('Ocorreu algum erro na criação do usuário.');
    });
  }
});

export default slice.reducer;
export const { resetRegisterUser } = slice.actions;
