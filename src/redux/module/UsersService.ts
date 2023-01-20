import { axiosExport } from 'redux/service/HttpService';
import { ApiConfig } from 'redux/service/ApiConfig';
import {
  IUser,
  IUsersForm,
  ISignIn,
  IUserLogged
} from 'redux/module/Users.type';

export const registerUser = async (data: IUsersForm) => {
  return await axiosExport.post<IUser>(`${ApiConfig.register}`, data);
};

export const signIn = async (data: ISignIn) => {
  return await axiosExport.post<IUserLogged>(`${ApiConfig.login}`, data);
};

export const getUsers = async () => {
  return await axiosExport.get<IUser[]>(`${ApiConfig.getUsers}`);
};

export const searchUser = async (search: string) => {
  return await axiosExport.get<IUser[]>(`${ApiConfig.getUsers}/?q=${search}`);
};

export const updateUser = async (id: number, data: IUser) => {
  const url = `${ApiConfig.getUsers}/${id}`;
  return await axiosExport.put(url, data);
};

export const deleteUser = async (id: number) => {
  const url = `${ApiConfig.getUsers}/${id}`;
  return await axiosExport.delete(url);
};
