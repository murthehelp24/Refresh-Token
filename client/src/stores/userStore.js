import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, registerApi } from "../apis/authApi";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      hdlLogin: async (email, password) => {
        try {
          console.log("login");

          const data = await loginApi(email, password);

          console.log("Login Success", data);

          set({
            user: data.user,
            token: data.token,
          });
        } catch (error) {
          console.log(error);
        }
      },

      hdlRegister: async (name, email, password) => {
        try {
          console.log("Register");

          const data = await registerApi(name, email, password);

          console.log("Register Success", data);
        } catch (error) {
          console.log(error);
        }
      },

      hdlLogout: () => {
        set({
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "userStorage",
    },
  ),
);

export default useUserStore;
