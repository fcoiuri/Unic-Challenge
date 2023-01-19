import { axiosExport } from 'redux/service/HttpService';
import { ApiConfig } from 'redux/service/ApiConfig';
import {
  IUsers,
  IUsersForm,
  ISignIn,
  IUserLogged
} from 'redux/module/Users.type';

export const registerUser = async (data: IUsersForm) => {
  return await axiosExport.post<IUsers>(`${ApiConfig.register}`, data);
};

export const signIn = async (data: ISignIn) => {
  return await axiosExport.post<IUserLogged>(`${ApiConfig.login}`, data);
};

export const getUsers = async () => {
  return await axiosExport.get<IUsers[]>(`${ApiConfig.getUsers}`);
};

export const searchUser = async (search: string) => {
  return await axiosExport.get<IUsers[]>(`${ApiConfig.getUsers}/?q=${search}`);
};
