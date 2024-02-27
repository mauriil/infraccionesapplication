import axios from 'axios';
import API_URL from './baseUrl';

export const getCombustible = async () => {
  const response = await axios.get(`${API_URL}combustible`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};
export const updateCombustible = async (combustible: any) => {
  const response = await axios.patch(
    `${API_URL}combustible/${combustible.id}`,
    combustible,
    {
      headers: {
        Authorization: `Bearer ${global.loggedUser.token}`,
      },
    },
  );
  return response.data;
};
