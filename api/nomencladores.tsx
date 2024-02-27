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
export const newNomenclador = async (nomenclador: any) => {
  const response = await axios.post(`${API_URL}nomencladores`, nomenclador, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};
