import axios from "axios";
const API_BASE_URL = "https://fudo-auth-service.vercel.app/api";
// const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${API_BASE_URL}/auth/refresh`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        return api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export const refresh = async () => {
  const data = await axios.get(`${API_BASE_URL}/auth/refresh`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export const uploadUserProfilePicture = async (data: FormData) => {
  return await axios({
    method: "POST",
    url: `${API_BASE_URL}/auth/upload-profile-picture`,
    data,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createProduct = async (data: FormData) => {
  return await axios({
    method: "POST",
    url: `${API_BASE_URL}/product`,
    data,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = async (data: FormData, productId: number) => {
  return await axios({
    method: "POST",
    url: `${API_BASE_URL}/product/${productId}`,
    data,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default api;
