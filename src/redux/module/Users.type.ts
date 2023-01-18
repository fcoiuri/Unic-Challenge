export interface IUsers {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

export interface IUsersForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}
export enum ApiStatus {
  'loading',
  'ideal',
  'success',
  'error'
}

export interface IUsersState {
  list: IUsers[];
  registerUser: ApiStatus;
}
