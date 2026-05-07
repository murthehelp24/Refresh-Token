import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, registerApi } from "../apis/authApi";
import { toast } from "react-toastify";

const useUserStore = create(
  persist((set, get) => ({
    user: null,
    token: null,
    loading: false,

    hdlLogin: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const data = await loginApi(email, password);
        set({ user: data.user, token: data.token, loading: false });
        toast.success('Login successful');
        toast.success(`welcome ${data.user?.name || 'unknown'}`)
        return true
      } catch (error) {
        const message = error.response?.data?.message || 'Something went wrong';
        set({ loading: false });
        toast.error(message)
        return false
      }
    },

    hdlRegister: async (name, email, password) => {
      set({ loading: true });
      try {
        await registerApi(name, email, password);
        set({ loading: false });
        toast.success("Registration successful");
        return true
      } catch (error) {
        const message = error.response?.data?.message || 'Something went wrong';
        set({ loading: false });
        toast.error(message);
        return false
      }
    },

    hdlLogout: () => {
      set({ user: null, token: null });
      toast.info("Logged out");
    },
  }),
    {
      name: "userStorage",
    }
  )
);

export default useUserStore;