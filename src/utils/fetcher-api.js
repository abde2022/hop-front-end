/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-console
// eslint-disable-next-line no-param-reassign

// @axios
import axios from "axios";

export const urlToAPi =
  "http://localhost/My-Project/FindThem/back-end/public/api/v1";

export default axios.create({
  baseURL: urlToAPi,
});

axios.defaults.baseURL = urlToAPi;

axios.interceptors.request.use((config) => {
  let token = null;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

const responseBody = (response) => response.data;

const headers = {
  headers: {
    Accept: "application/json, text/plain, image/*, application/pdf, */*",
    "Content-Type": "application/json",
  },
};

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body, headers).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url, body) => axios.delete(url, body, headers).then(responseBody),
  patch: (url, body) => axios.patch(url, body, headers).then(responseBody),
};

export const Auth = {
  register: (form) => requests.post("/auth/register", form),
  login: (form) => requests.post("/auth/login", form),
  logout: () => requests.post("/auth/logout"),
  me: () => requests.post("/auth/me"),
  resetPassword: (form) => requests.post("/auth/resetPassword", form),
};
