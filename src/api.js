const axios = require('axios');

const axio = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const api = {
  test: async () => {
    const res = await axio.get('/api/test');
    console.log(res);
  },
};

export default api;
