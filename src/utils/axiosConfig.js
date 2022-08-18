import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.124.177.111:8787',
});

export default instance;
