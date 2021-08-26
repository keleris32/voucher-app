import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnvironmentVariables from '../config/env';

let headers = {};

const axiosInstance = axios.create({
  baseURL: EnvironmentVariables.BASE_URL,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(token);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
