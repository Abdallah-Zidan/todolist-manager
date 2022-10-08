export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface LoginResponseData extends User {
  accessToken: string;
  refreshToken: string;
}

export type RegisterResponseData = User;

export type RefreshTokenResponseData = LoginResponseData;


export interface LoginRequestData {
  email: string;
  password: string;
}

export interface RegisterRequestData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

