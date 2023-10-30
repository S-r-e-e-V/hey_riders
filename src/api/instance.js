import axios from "axios";

const BASE_URL = "http://localhost:3001";
// const BASE_URL = "https://dashboard.render.com";

export default axios.create({
  baseURL: BASE_URL,
});
