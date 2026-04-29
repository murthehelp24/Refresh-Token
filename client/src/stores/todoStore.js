import { create } from "zustand";
import { persist } from "zustand/middleware";
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

      hdlGetTodo: async () => {
        try {
          const data = await getTodoApi();

          set({
            todos: data,
          });
        } catch (error) {
          console.log(error);
        }
      },

      hdlAddTodo: async (description) => {
        try {
          await createTodoApi(description);

          get().hdlGetTodo();
        } catch (error) {
          console.log(error);
        }
      },

      hdlUpdateTodo: async (item) => {
        try {
          await updateTodoApi(item.id, item.isDone, item.description);

          get().hdlGetTodo();
        } catch (error) {
          console.log(error);
        }
      },

      hdlDeleteTodo: async (id) => {
        try {
          await deleteTodoApi(id);

          get().hdlGetTodo();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "todoStorage",
    },
  ),
);

export default useTodoStore;
