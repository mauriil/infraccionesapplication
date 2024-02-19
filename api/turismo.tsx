import axios from 'axios';
import API_URL from './baseUrl';

export const getAllTurismo = async () => {
  const response = await axios.get(`${API_URL}t-turismo`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};