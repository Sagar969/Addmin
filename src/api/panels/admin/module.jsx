import axios from "axios";

// Create axios instance with base configuration
const Module = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL + "/module",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
const adminId = import.meta.env.VITE_ADMIN_ID;

// Add request interceptor to handle auth token
// Module.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor to handle errors
// Module.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       // Handle unauthorized access
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// API functions for modules
export const getAllModules = async () => {
  try {
    const response = await Module.get(`/${adminId}`);
    return response.data;
  } catch (error) {
    console.error(
      error.response.data.errorMessage || error.response.data.message
    );
    return error.response.data;
  }
};

// Get single module by ID
export const getModuleById = async (id) => {
  const response = await Module.get(`/${id}`);
  return response.data;
};

// Create new module
export const createModule = async (moduleData) => {
  const response = await Module.post("", moduleData);
  return response.data;
};

// Update existing module
export const updateModule = async (id, moduleData) => {
  const response = await Module.put(`/${id}`, moduleData);
  return response.data;
};

// Delete module
export const deleteModule = async (id) => {
  const response = await Module.delete(`/${id}`);
  return response.data;
};
