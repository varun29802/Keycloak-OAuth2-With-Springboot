import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../config/authcontext';

const apiAxios = axios.create({
  baseURL: "http://192.168.29.38:7081",
  timeout: 10000,
});

// Helper function to check token expiration
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return tokenPayload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

// Request interceptor
apiAxios.interceptors.request.use(async (config) => {
  const token = Cookies.get('KEYCLOAK_ACCESS');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  if (isTokenExpired(token)) {
    const { logout } = useAuth();
    logout();
    throw new Error('Token expired. Please login again.');
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
apiAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const { logout } = useAuth();
        logout();
        throw new Error('Session expired. Please login again.');
      }
      
      if (error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

// API Methods
export const getServiceAWelcome = async () => {
  const response = await apiAxios.get("/service-a/welcome");
  return response.data;
};

export const getServiceADataFromB = async () => {
  const response = await apiAxios.get("/service-a/service-Bdata");
  return response.data;
};

export const getServiceBWelcome = async () => {
  const response = await apiAxios.get("/service-b/welcome");
  return response.data;
};

export const getServiceBDataFromA = async () => {
  const response = await apiAxios.get("/service-b/service-Adata");
  return response.data;
};