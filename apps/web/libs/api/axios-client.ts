import axios from "axios";

export const baseURL = "";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (or any other storage method you're using)
    const token = "";

    // If a token is found, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the request error here
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors (optional)
axiosClient.interceptors.response.use(
  (response) => {
    // Do something with the response data if needed
    return response.data;
  },
  (error) => {
    // Handle the response error here
    // For example, you can check for specific status codes and perform actions accordingly
    // if (error.response.status === 401) {
    // Handle unauthorized error (e.g., redirect to login page)
    // console.error('Unauthorized, please log in again.');
    // }

    return Promise.reject(error);
  }
);

export default axiosClient;
