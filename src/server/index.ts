import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: "https://api.thecleaner.app.br/",
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
  if (error.response) {
    //trata erro da api
    //console.log(error.response);
    //alert(error.response.data.message);
  }

  if (error.response.status === 400) {
    //chama tela de login
    //window.location.href = "/?notAuthorized=true";
    return Promise.resolve(error.response);
  }

 if (error.response.status === 401) {
    //chama tela de login
    //window.location.href = "/?notAuthorized=true";
    return Promise.resolve(error.response);
  }

  if (error.response.status === 404) {
    //chama tela de login
    //window.location.href = "/?notAuthorized=true";
    return Promise.resolve(error.response);
  }

  if (error.response.status === 500) {
    //chama tela de login
    //window.location.href = "/?notAuthorized=true";
    return Promise.resolve(error.response);
  }

  return Promise.reject(error);
});

export { api, apiCEP, geolocation, bigdatacloud };
