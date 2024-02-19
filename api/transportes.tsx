import axios from 'axios';
import API_URL from './baseUrl';

export const getAllTransportes = async () => {
  const response = await axios.get(`${API_URL}transporte`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};