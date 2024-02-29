import axios from 'axios';
import API_URL from './baseUrl';
import { useAsyncStorage } from '@react-native-community/async-storage';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}users/login`, { username, password });
    const loggedUser = response.data;

    global.loggedUser = loggedUser;

    const { setItem } = useAsyncStorage('loggedUser');
    await setItem(JSON.stringify(loggedUser));

    return loggedUser;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const checkToken = async () => {
  try {
    const { getItem } = useAsyncStorage('loggedUser');
    const loggedUser = await getItem();

    const response = await axios.post(`${API_URL}users/checkToken`, { token: loggedUser.token });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error('Error checking token:', error);
  }

  return false;
};
