import axios from 'axios';
import API_URL from './baseUrl';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}users/login`, { email: username, password });
    const loggedUser = response.data;

    global.loggedUser = loggedUser;

    return loggedUser;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};