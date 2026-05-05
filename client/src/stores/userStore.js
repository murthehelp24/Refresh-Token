import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { loginApi, registerApi } from "../apis/authApi";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      hdlLogin: async (email, password) => {
        try {
          set({ loading: true, error: null });

          const data = await loginApi(email, password);

          set({
            user: data.user,
            token: data.token,
            loading: false,
          });

          toast.success("Login successful");
        } catch (error) {
          const message =
            error.response?.data?.message || error.message;

          set({
            loading: false,
            error: message,
          });

          toast.error(message || "Login failed");
        }
      },

      hdlRegister: async (name, email, password) => {
        try {
          set({ loading: true, error: null });

          await registerApi(name, email, password);

          set({ loading: false });

          toast.success("Registration successful");
        } catch (error) {
          const message =
            error.response?.data?.message || error.message;

          set({
            loading: false,
            error: message,
          });

          toast.error(message || "Registration failed");
        }
      },

      hdlLogout: () => {
        set({
          user: null,
          token: null,
        });

        toast.info("Logged out");
      },
    }),
    {
      name: "userStorage",
    }
  )
);

export default useUserStore;