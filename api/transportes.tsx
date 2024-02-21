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

export const newTransporteRequest = async (newTransporte) => {
  const response = await axios.post(`${API_URL}transporte`, newTransporte, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};
