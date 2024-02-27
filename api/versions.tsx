import axios from 'axios';
import API_URL from './baseUrl';

export const checkVersion = async () => {
  try {
    const response = await axios.get(`${API_URL}versions`);
    const newVersion = response.data;

    return newVersion;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};