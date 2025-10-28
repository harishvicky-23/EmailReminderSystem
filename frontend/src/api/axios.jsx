import axios from "axios";

const api = axios.create({
  baseURL: "https://emailremindersystem-rad4.onrender.com/"
});

export default api;
