import axios from 'axios';
import API_URL from './baseUrl';

export const getAllCorralones = async () => {
  const response = await axios.get(`${API_URL}corralones`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};

export const newCorralonRequest = async newCorralon => {
  const response = await axios.post(`${API_URL}corralones`, newCorralon, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};
