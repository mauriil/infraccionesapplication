import axios from 'axios';
import API_URL from './baseUrl';

export const getAllNomencladores = async () => {
  const response = await axios.get(`${API_URL}nomencladores`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};