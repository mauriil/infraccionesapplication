import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/users';

export const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};