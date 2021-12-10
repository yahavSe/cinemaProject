import axios from "axios";

const url = "http://localhost:3001/users/";
const urlMovies = "http://localhost:3002/movies/";
const urlMembers = "http://localhost:3002/members/";
const urlSubscription = "http://localhost:3002/subscriptions/";

const getALL = async () => {
  let user = await axios.get(url);
  return user.data;
};

const getById = async (id) => {
  let user = await axios.get(`${url}${id}`);
  return user.data;
};

const addUser = (obj) => {
  return axios.post(url, obj);
};

const updateUser = (obj, id) => {
  return axios.put(`${url}${id}`, obj);
};

const deleteUser = (id) => {
  return axios.delete(url + "/" + id);
};

const getALLMovies = async () => {
  let user = await axios.get(urlMovies);
  return user.data;
};

const getByIdMovies = async (id) => {
  let user = await axios.get(`${urlMovies}${id}`);
  return user.data;
};

const addMovie = (obj) => {
  return axios.post(urlMovies, obj);
};

const updateMovie = (obj, id) => {
  return axios.put(`${urlMovies}${id}`, obj);
};

const deleteMovie = (id) => {
  return axios.delete(urlMovies + "/" + id);
};

const getALLMembers = async () => {
  let user = await axios.get(urlMembers);
  return user.data;
};

const getByIdMember = async (id) => {
  let user = await axios.get(`${urlMembers}${id}`);
  return user.data;
};

const addMember = (obj) => {
  return axios.post(urlMembers, obj);
};

const updateMember = (obj, id) => {
  console.log("k");
  return axios.put(`${urlMembers}${id}`, obj);
};

const deleteMember = (id) => {
  return axios.delete(urlMembers + "/" + id);
};

const getALLSubscriptions = async () => {
  let user = await axios.get(urlSubscription);
  return user.data;
};

const getByIdSubscription = async (id) => {
  let user = await axios.get(`${urlSubscription}${id}`);
  return user.data;
};

const addSubscription = (obj) => {
  return axios.post(urlSubscription, obj);
};

const updateSubscription = (obj, id) => {
  return axios.put(`${urlSubscription}${id}`, obj);
};

const deleteSubscription = (id) => {
  return axios.delete(urlSubscription + "/" + id);
};

const exportedObject = {
  getALL,
  getById,
  addUser,
  deleteUser,
  updateUser,
  getALLMovies,
  getByIdMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getALLMembers,
  getByIdMember,
  addMember,
  updateMember,
  deleteMember,
  getALLSubscriptions,
  getByIdSubscription,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
export default exportedObject;