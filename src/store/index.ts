import { create } from "zustand";
import { persist } from "zustand/middleware";
import { merge } from "lodash";

interface AppActions {
  setJwt: (token: string | null) => void;
  resetState: () => void;
  // Add more actions as needed
}

interface AppState {
  jwt: string | null;
  actions: AppActions;
  // Add more fields for future (user, device, etc)
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      jwt: null,
      actions: {
        setJwt: (token) => set({ jwt: token }),
        resetState: () => set({ jwt: null }),
      },
    }),
    {
      name: "AppState",
      merge: (persisted, current) => merge({}, current, persisted),
    }
  )
);

// Selector for JWT
export const useJwt = () => useStore((s) => s.jwt);
export const useAppActions = () => useStore((s) => s.actions);

export default useStore;
