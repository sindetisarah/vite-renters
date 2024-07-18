import axios from "axios";
import store from "./store";
import { getStorageData } from "@/lib/utils";

// Create an axios instance with baseURL and default headers
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization token header to requests
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage and add it to the header
    config.headers = {
      "x-auth-token": `${getStorageData("token")}`,
      "x-server-key": "DF67V3H5KK45J5LL45J",
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh token
api.interceptors.response.use(
  // If response is successful, return it
  (response) => {
    return response;
  },
  // If error response is received
  async (error) => {
    // Check if the error status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error here, for example, redirect to login page
      console.log("Unauthorized error occurred, redirecting to login page.");
    }

    // Reject the promise with the error
    return Promise.reject(error);
  }
);

export default api;
