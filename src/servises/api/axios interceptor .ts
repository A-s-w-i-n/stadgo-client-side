import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});
export const apiAuth: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(
  (config) => {
    const User = JSON.parse(localStorage.getItem("user") as string);
    if (User) {
      const tokens = User.token;
      console.log(tokens, "rrrrrr");

      if (tokens) {
        config.headers["authorization"] = `Bearer ${tokens}`;
      }
    }

    const Owner = JSON.parse(localStorage.getItem("owner") as string);
    if (Owner) {
      const ownerTokens = Owner.accessToken;
      
      console.log("hiiiii");
      if (ownerTokens) {
        config.headers["ownerauthorization"] = `Bearer ${ownerTokens}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiAuth.interceptors.response.use(
  (respose: AxiosResponse) => {
    return respose;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
