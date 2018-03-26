import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'https://react-mandycodestoo-burger.firebaseio.com/'
});

export default axiosInstance;