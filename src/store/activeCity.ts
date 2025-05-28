import { create } from "zustand";

interface IActiveIndexState {
  activeIndex: number;
  setActiveIndex: (index: number) => void
}

export const useActiveCityStore = create<IActiveIndexState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({activeIndex: index})
}))