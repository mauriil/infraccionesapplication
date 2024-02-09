import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/nomencladores';

export const getAllNomencladores = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};