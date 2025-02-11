import axios from "axios";
import { consoleResError } from "../../../lib/utils/error";

// Create axios instance with base configuration
const Admin = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL + "/admin",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
const adminId = import.meta.env.VITE_ADMIN_ID;

// Add request interceptor to handle auth token
// Admin.interceptors.request.use(
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
// Admin.interceptors.response.use(
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

// API functions for admins
export const getAllAdmins = async () => {
  try {
    const response = await Admin.get(``);
    return response.data;
  } catch (error) {
    console.error(
      error.response.data.errorMessage || error.response.data.message
    );
    return error.response.data;
  }
};

// Get single admin by ID
export const getAdminById = async (id) => {
  try {
    const response = await Admin.get(`/${adminId}`);
    return response.data;
  } catch (err) {
    consoleResError(err.response.data);
  }
};

// Create new admin
export const createAdmin = async (adminData) => {
  const response = await Admin.post("", adminData);
  return response.data;
};

// Update existing admin
export const updateAdmin = async (id, adminData) => {
  const response = await Admin.put(`/${id || adminId}`, adminData);
  return response.data;
};

// Delete admin
export const deleteAdmin = async (id) => {
  const response = await Admin.delete(`/${id}`);
  return response.data;
};
