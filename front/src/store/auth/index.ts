import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthState } from "./type";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (data) => {
        set({ user: data, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
