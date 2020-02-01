import axios from 'axios';

function generateSID() {
  const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const length = 20;
  let sid = '';
  for (let i = 0; i < length; i++) {
    sid += values[Math.floor(Math.random() * (values.length - 1))];
  }
  return sid;
}

if (!window.localStorage.getItem('sessionId')) {
  window.localStorage.setItem('sessionId', generateSID());
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    sessionId: window.localStorage.getItem('sessionId'),
  },
});

export default axiosInstance;
