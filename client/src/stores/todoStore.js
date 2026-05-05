import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import {
  getTodoApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../apis/todoApi";

const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      loading: false,
      error: null,

      hdlGetTodo: async () => {
        try {
          set({ loading: true, error: null });

          const data = await getTodoApi();

          set({
            todos: data,
            loading: false,
          });
        } catch (error) {
          const message =
            error.response?.data?.message || error.message;

          set({
            loading: false,
            error: message,
          });

          toast.error(message);
        }
      },

      hdlAddTodo: async (description) => {
        try {
          set({ loading: true });

          const newTodo = await createTodoApi(description);

          set((state) => ({
            todos: [...state.todos, newTodo],
            loading: false,
          }));

          toast.success("create success");
        } catch (error) {
          const message =
            error.response?.data?.message || error.message;

          set({ loading: false, error: message });
          toast.error(message);
        }
      },

      hdlUpdateTodo: async (item) => {
        try {
          set({ loading: true });

          const updated = await updateTodoApi(
            item.id,
            item.isDone,
            item.description
          );

          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === item.id ? updated : t
            ),
            loading: false,
          }));

          toast.success("update success");
        } catch (error) {
          const message =
            error.response?.data?.message || error.message;

          set({ loading: false, error: message });
          toast.error(message);
        }
      },

      hdlDeleteTodo: async (id) => {
        try {
          set({ loading: true });

          await deleteTodoApi(id);

          set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
            loading: false,
          }));

          toast.success("deleted");
        } catch (error) {
          const message =
            error.response?.data?.message || error.message;

          set({ loading: false, error: message });
          toast.error(message);
        }
      },
    }),
    {
      name: "todoStorage",
    }
  )
);

export default useTodoStore;