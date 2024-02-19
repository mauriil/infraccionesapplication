import axios from 'axios';
import API_URL from './baseUrl';

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}users`);
  return response.data;
};