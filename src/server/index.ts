import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: "https://api.thecleaner.app.br/v1",
});

const apiCEP = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

const geolocation = axios.create({
  baseURL: "https://geolocation-db.com/json/",
});

const bigdatacloud = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  /*if (error.response) {
    //trata erro da api
    //this.toastify.show(error.response.data.error);
  }*/

 if (error.response.status === 401) {
    //chama tela de login
    //window.location.href = "/?notAuthorized=true";
    return Promise.reject(error);
  }

  return Promise.reject(error);
});

export { api, apiCEP, geolocation, bigdatacloud };
