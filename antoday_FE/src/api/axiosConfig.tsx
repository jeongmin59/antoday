import Axios from "axios";

export const axiosInstance = Axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    "Content-Type": "application/json"
  }
})