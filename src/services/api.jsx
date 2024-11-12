import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.castly.gg', 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});