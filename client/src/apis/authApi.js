import api from "../configs/axios.config";

export const loginApi = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const registerApi = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
