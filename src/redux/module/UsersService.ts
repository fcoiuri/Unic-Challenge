import { axiosExport } from 'redux/service/HttpService';
import { ApiConfig } from 'redux/service/ApiConfig';
import { IUsers, IUsersForm } from 'redux/module/Users.type';

export const registerUser = async (data: IUsersForm) => {
  return await axiosExport.post<IUsers>(`${ApiConfig.users}/register`, data);
};
