import { create } from 'zustand'

interface IUserStore {
  name: string,
  citiesList: ICity[],
  setUserStore: (userData: IUser) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  name: '',
  citiesList: [],
  setUserStore: (userData) => set({ name: userData.name, citiesList: userData.citiesList})
}))
