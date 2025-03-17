import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthState } from "./type";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (token) => {
        set({ token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
