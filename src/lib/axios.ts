import axios from "axios";
import { useStore } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Always fetch latest JWT from Zustand on request
api.interceptors.request.use((config) => {
  const jwt = useStore.getState().jwt;
  if (jwt && config.url !== "/login") {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

export default api;
