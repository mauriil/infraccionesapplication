import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/users';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email: username, password });
    const loggedUser = response.data;

    global.loggedUser = loggedUser;

    return loggedUser;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};