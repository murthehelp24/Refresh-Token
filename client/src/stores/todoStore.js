import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { getTodoApi, createTodoApi, updateTodoApi, deleteTodoApi } from "../apis/todoApi";

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      loading: false,

      hdlGetTodo: async () => {
        try {
          set({ loading: true });
          const data = await getTodoApi();
          set({ todos: data, loading: false });
        } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          set({ loading: false });
          toast.error(message);
        }
      },

      hdlAddTodo: async (description) => {
        try {
          set({ loading: true });
          const newTodo = await createTodoApi(description);
          set((state) => ({ todos: [...state.todos, newTodo], loading: false }));
          toast.success("create success");

        } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          set({ loading: false });
          toast.error(message);
        }
      },

      hdlUpdateTodo: async (item) => {
        try {
          set({ loading: true });
          const updated = await updateTodoApi(item.id, item.isDone, item.description);
          set((state) => ({
            todos: state.todos.map((t) =>
              t.id === item.id ? updated : t
            ),
            loading: false
          }));
        } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          set({ loading: false });
          toast.error(message);
        }
      },

      hdlDeleteTodo: async (id) => {
        try {
          set({ loading: true });
          await deleteTodoApi(id);
          set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
            loading: false
          }));
        } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          set({ loading: false });
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