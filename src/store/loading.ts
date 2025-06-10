import { create } from "zustand";

interface ILoadingState {
  loading: boolean;
  setLoading: (newState: boolean) => void
}

export const useLoadingStore = create<ILoadingState>((set) => ({
  loading: false,
  setLoading: (newState) => set({loading: newState})
}))