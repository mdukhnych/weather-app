import { create } from 'zustand'

interface IUserStore extends IUser {
  setUserStore: (userData: IUser) => void,
  setCitiesList: (newList: ICity[]) => void
  setWeatherToStore: (index: number, newWeather: IWeather) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  uid: '',
  name: '',
  citiesList: [],
  setUserStore: (userData) => set(userData),
  setCitiesList: (newList) => set({citiesList: newList}),
  setWeatherToStore: (index, newWeather) =>
    set((state) => {
      const updatetd = [...state.citiesList]
      updatetd[index] = {
        ...updatetd[index],
        weather: newWeather
      }
      return { citiesList: updatetd }
    })
}))