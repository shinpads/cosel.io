import axios from './util/axios';

const api = {
  test: async () => {
    const res = await axios.get('/api/test');
    console.log(res);
  },
};

export default api;
