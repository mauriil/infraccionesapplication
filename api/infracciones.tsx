import axios from 'axios';
import API_URL from './baseUrl';

export const nuevaInfraccion = async infraccionBody => {
  try {
    const response = await axios.post(
      `${API_URL}infracciones`,
      infraccionBody,
      {
        headers: {
          Authorization: `Bearer ${global.loggedUser.token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating infraccion:', error);
  }
};

export const listaInfracciones = async (zorroId = '') => {
  let query = '';
  if (zorroId) {
    query = `?zorroId=${zorroId}`;
  }
  try {
    const response = await axios.get(`${API_URL}infracciones${query}`, {
      headers: {
        Authorization: `Bearer ${global.loggedUser.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating infraccion:', error);
  }
};

export const infraccionById = async id => {
  try {
    const response = await axios.get(`${API_URL}infracciones/${id}`, {
      headers: {
        Authorization: `Bearer ${global.loggedUser.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating infraccion:', error);
  }
};

export const infraccionByNumero = async numInfraccion => {
  try {
    const response = await axios.get(
      `${API_URL}infracciones/byNum/${numInfraccion}`,
      {
        headers: {
          Authorization: `Bearer ${global.loggedUser.token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating infraccion:', error);
  }
};
