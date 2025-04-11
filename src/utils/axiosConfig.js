import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cavabrew.com',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformRequest: [function (data) {
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret.slice(0, -1);
  }]
});

// Interceptor para debug
api.interceptors.request.use(config => {
  console.log('Request interceptado:', {
    url: config.url,
    method: config.method,
    data: config.data,
    headers: config.headers
  });
  return config;
});

export default api;