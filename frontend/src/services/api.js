import request from "../config/request";

// ==================== USER APIs ====================
export const getAllUsers = () => {
  return request.get("/user/get-all-user");
};

export const getUserById = (id) => {
  return request.get(`/user/get-userId/${id}`);
};

export const createUser = (data) => {
  return request.post("/user/register", data);
};

export const googleLogin = (token) => {
  return request.post("/user/google-login", { token });
};

export const updateUser = (id, data) => {
  return request.put(`/user/update-user/${id}`, data);
};

export const deleteUser = (id) => {
  return request.delete(`/user/delete/${id}`);
};

// ==================== PRODUCT APIs ====================
export const getAllProducts = () => {
  return request.get("/product/list");
};

export const getProductById = (id) => {
  return request.get(`/product/detail/${id}`);
};

export const createProduct = (formData) => {
  return request.post("/product/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProduct = (id, formData) => {
  return request.put(`/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (id) => {
  return request.delete(`/product/delete/${id}`);
};

// ==================== CATEGORY APIs ====================
export const getAllCategories = () => {
  return request.get("/category/list");
};

// ==================== AUTH APIs ====================
export const fetchAccountAPI = () => {
  return request.get("/user/auth");
};
