// src/services/authService.js
import api from '../utils/axiosConfig';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response;
  } catch (error) {
    throw error;
  }
};