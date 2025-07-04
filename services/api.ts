import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-androura.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
