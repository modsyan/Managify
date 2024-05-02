import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (): AxiosInstance => {
  const isProduction = import.meta.env.MODE === "production";

  const baseURL = isProduction
    ? "https://api.example.com" // Replace with your production API URL
    : "http://localhost:5001"; // Replace with your development API URL
  // assign baseUrl based on VITE_URL

  // const baseURL = import.meta.env.VITE_API_URL as string;

  const instance = axios.create({
    baseURL,
    // Other Axios configuration options
  });

  return instance;
};

const axiosClient = createAxiosInstance();

export default axiosClient;
