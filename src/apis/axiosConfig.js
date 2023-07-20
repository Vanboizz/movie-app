import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://api.themoviedb.org',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.customKey}`,
  },
});

// request
axiosClient.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
