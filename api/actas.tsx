import axios from 'axios';
import API_URL from './baseUrl';

export const getAllActas = async () => {
  const response = await axios.get(`${API_URL}actas`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};

export const newActaRequest = async (newActa) => {
  try {
    const response = await axios.post(`${API_URL}actas`, newActa, {
      headers: {
        Authorization: `Bearer ${global.loggedUser.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear acta', error.response.data);
    throw error;
  }
};
