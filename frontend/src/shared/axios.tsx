import axios from 'axios';
import { storage } from '../auth/common';
import { refreshAccessToken } from '../auth/api/api';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});


axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(config => {
    if (config && config.headers && !isRefreshRequest(config)) {
      config.headers['Authorization'] = `Bearer ${storage.getToken()}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as any;
      if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest(error.config)) {
        originalRequest._retry = true;
        const { refreshToken, accessToken } = await refreshAccessToken();
        storage.setToken(accessToken);
        storage.setToken(refreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);


function isRefreshRequest(config: { url?: string } = {}) {
  return config?.url?.endsWith?.('token') || config?.url?.endsWith?.('logout');
}

export default axiosInstance;