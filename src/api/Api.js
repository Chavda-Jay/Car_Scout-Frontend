import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3800"
});

export default API;