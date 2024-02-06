import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/transporte';

export const getAllTransportes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};