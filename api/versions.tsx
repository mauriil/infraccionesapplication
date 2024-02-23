import axios from 'axios';
import API_URL from './baseUrl';

export const checkVersion = async () => {
  try {
    const response = await axios.get(`${API_URL}versions`,  {
      headers: {
        Authorization: `Bearer ${global.loggedUser.token}`,
      },
    });
    const newVersion = response.data;

    return newVersion;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};