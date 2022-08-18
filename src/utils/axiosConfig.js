import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://springboot-mysql:8787',
});

export default instance;
