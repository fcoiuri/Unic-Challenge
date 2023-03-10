export interface IUser {
  admin: boolean;
  email: string;
  password?: string;
  firstName: string;
  id?: number;
  lastName: string;
}

export interface IUserLogged {
  accessToken?: string | null;
  user?: {
    [key: string]: IUser;
  };
}

export interface IUserFormUpdate {
  id: number;
  user: IUser;
}

export interface ISignIn {
  email: string;
  password: string;
  accessToken?: string;
  user?: IUserLogged;
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
  users: IUser[];
  usersStatus: ApiStatus;
  registerUser: ApiStatus;
  signIn: ApiStatus;
  user: IUserLogged;
}
