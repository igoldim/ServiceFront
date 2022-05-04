import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

api.interceptors.request.use((config) => {
  const  token = "token do usuario"; //store.getState().user user reducer

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
    //this.toastify.show(error.response.data.error);
  }

  if (error.response.status === 401) {
    //chama tela de login
    //window.location.href = "/?notAuthorized=true";
  }

  return Promise.reject(error);
});

export { api, apiCEP, geolocation, bigdatacloud };
