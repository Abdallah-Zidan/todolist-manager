import { storage } from '../common';
import axiosAuth from '../../shared/axios';
import {
  LoginRequestData,
  LoginResponseData,
  RefreshTokenResponseData,
  RegisterRequestData,
  RegisterResponseData, User,
} from './interfaces';


export async function refreshAccessToken() {
  const response = await axiosAuth.get<RefreshTokenResponseData>('/auth/token', {
    headers: {
      Authorization: `Bearer ${storage.getRefreshToken()}`,
    },
  });
  return response.data;
}


export async function login(data: LoginRequestData): Promise<LoginResponseData> {
  const response = await axiosAuth.post<LoginResponseData>('/auth/login', data);
  return response.data;
}

export async function register(
  data: RegisterRequestData,
): Promise<RegisterResponseData> {
  const response = await axiosAuth.post<RegisterResponseData>('/auth/register', data);
  return response.data;
}

export async function getProfile(): Promise<User> {
  const response = await axiosAuth.get<User>('/auth/me', {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
}

export async function logout() {
  if (storage.getRefreshToken()) {
    const response = await axiosAuth.delete('/auth/logout', {
      headers: {
        Authorization: `Bearer ${storage.getRefreshToken()}`,
      },
    });
    return true;
  }
  return false;
}
