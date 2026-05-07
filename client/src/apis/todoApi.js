import api from "../configs/axios.config";
import useUserStore from "../stores/userStore";

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTodoApi = async () => {
  const res = await api.get("/todos");
  return res.data;
};

export const createTodoApi = async (description) => {
  const res = await api.post("/todos", {
    description,
  });

  return res.data;
};

export const updateTodoApi = async (id, isDone, description) => {
  const res = await api.patch(`/todos/${id}`, {
    isDone,
    description,
  });

  return res.data;
};

export const deleteTodoApi = async (id) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};
