import { redirect } from 'react-router-dom';
import { isExpired } from 'react-jwt';

const JWT_KEY = 'USER_JWT';
const REFRESH_JWT_KEY = 'USER_REFRESH_JWT';
const LOGGED_IN_KEY = 'LOGGED_IN';

export function throwRedirectIfUser() {
  if (storage.getRefreshToken()) {
    throw  redirect('/');
  }
}


export async function checkTokens() {
  const token = storage.getToken();
  if (token && !isExpired(token)) {
    return true;
  }
  const refreshToken = storage.getRefreshToken();
  return !!(refreshToken && !isExpired(refreshToken));
}

export const storage = {
  getToken() {
    return localStorage.getItem(JWT_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_JWT_KEY);
  },
  setToken(token?: string | null) {
    if (token) {
      return localStorage.setItem(JWT_KEY, token);
    }
  },
  setRefreshToken(token?: string | null) {
    if (token) {
      return localStorage.setItem(REFRESH_JWT_KEY, token);
    }
  },
  setLoggedIn(value = true) {
    localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(value));
  },

  getLoggedIn() {
    return ['true', true].includes(localStorage.getItem(LOGGED_IN_KEY) as string);
  },

  clearTokens() {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(REFRESH_JWT_KEY);
    localStorage.removeItem(LOGGED_IN_KEY);
  },
};