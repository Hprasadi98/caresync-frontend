import axios from "axios";
import { baseUrl } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({});

api.defaults.baseURL = baseUrl;



// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access-token");
    console.log("Token:", token);
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Intercepted");
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
