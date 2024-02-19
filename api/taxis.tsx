import axios from 'axios';
import API_URL from './baseUrl';

export const getAllTaxiRemises = async () => {
  const response = await axios.get(`${API_URL}taxi-remis`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};

export const createNewTaxiRemis = async (taxiRemis) => {
  const response = await axios.post(`${API_URL}taxi-remis`, taxiRemis, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
}