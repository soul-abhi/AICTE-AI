import axios from 'axios';
import { authApi } from './authApi';

export const http = axios.create({
  baseURL: '/api'
});

http.interceptors.request.use((config) => {
  const token = authApi.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
