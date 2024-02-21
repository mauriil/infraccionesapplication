import axios from 'axios';
import API_URL from './baseUrl';

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}users`);
  return response.data;
};

export const newUserRequest = async (user) => {
  const response = await axios.post(`${API_URL}users/register`, user);
  return response.data;
}