import axios from "./axios.js";

const api = {
  get: (endpoint) => axios.get(`${endpoint}`),
  post: (endpoint, body) => axios.post(`${endpoint}`, body),
  put: (endpoint, body) => axios.put(`${endpoint}`, body),
  delete: (endpoint) => axios.delete(`${endpoint}`),
};

export default api;
