import axios from 'axios';
import API_URL from './baseUrl';

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}users`);
  return response.data;
};

export const newUserRequest = async (user) => {
  const response = await axios.post(`${API_URL}users/register`, user);
  return response.data;
};

export const editUserData = async (user) => {
  const response = await axios.patch(`${API_URL}users/${user._id}`, user, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}users/${userId}`, {
    headers: {
      Authorization: `Bearer ${global.loggedUser.token}`,
    },
  });
  return response.data;
};
