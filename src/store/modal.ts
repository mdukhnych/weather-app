import { create } from "zustand";

interface IModalState {
  showModal: boolean;
  type: string | null;
  weather: CurrentWeather | DailyWeather | HourlyWeather | null | undefined;
  setModal: ({
    showModal, weather, type
  }: {
    showModal: boolean, 
    weather: CurrentWeather | DailyWeather | HourlyWeather | null | undefined; 
    type: string | null;
  }) => void
}

export const useModalStore = create<IModalState>((set) => ({
  showModal: false,
  type: null,
  weather: null,
  setModal: ({showModal, weather, type}) => set({showModal: showModal, type: type, weather: weather})
}))