import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ORIGIN_URL,
});
export const apiAuth: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ORIGIN_URL,
});

api.interceptors.request.use(
  (config) => {
    const User = JSON.parse(localStorage.getItem("user") as string);
    if (User) {
      const tokens = User.token;

      if (tokens) {
        config.headers["authorization"] = `Bearer ${tokens}`;
      }
    }

    const Owner = JSON.parse(localStorage.getItem("owner") as string);
    if (Owner) {
      const ownerTokens = Owner.accessToken;
      
      if (ownerTokens) {
        config.headers["ownerauthorization"] = `Bearer ${ownerTokens}`;
      }
    }
    const admin =JSON.parse(localStorage.getItem("admins") as string)
    if(admin){
      const adminToken =admin?.adminToken
      config.headers["adminauthorization"] = `Bearer ${adminToken}`
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
