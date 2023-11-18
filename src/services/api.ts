import axios, { AxiosInstance } from 'axios';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
