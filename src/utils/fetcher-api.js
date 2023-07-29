/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-console
// eslint-disable-next-line no-param-reassign

// @axios
import axios from "axios";

export const urlToAPi =
  "http://localhost/My-Project/HopCrmTest/back-end/public/api/v1";

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

export const Contact = {
  list: (form) =>
    requests.get(
      `/contact?currentPage=${form.currentPage}&itemPerPage=${form.itemPerPage}`
    ),
  show: (id) => requests.get(`/contact/${id}`),
  create: (form) => requests.post(`/contact/store`, form),
  update: (id, form) => requests.put(`/contact/update/${id}`, form),
  delete: (id) => requests.del(`/contact/destroy/${id}`),
  isAlreadyExist: (form) => requests.post(`/contact/isAlreadyExist`, form),
};

export const Organisation = {
  list: (form) =>
    requests.get(
      `/organisation?currentPage=${form.currentPage}&itemPerPage=${form.itemPerPage}`
    ),
  show: (id) => requests.get(`/organisation/${id}`),
  create: (form) => requests.post(`/organisation/store`, form),
  update: (id, form) => requests.put(`/organisation/update/${id}`, form),
  delete: (id) => requests.del(`/organisation/destroy/${id}`),
  isAlreadyExist: (form) => requests.post(`/organisation/isAlreadyExist`, form),
};

export const ContactOrganisation = {
  list: (form) =>
    requests.get(
      `/contact-organisation?currentPage=${form.currentPage}&itemPerPage=${form.itemPerPage}`
    ),
  show: (contactId) => requests.get(`/contact-organisation/${contactId}`),
};
