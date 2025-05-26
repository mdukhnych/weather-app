import { create } from 'zustand'

interface IUserStore extends IUser {
  setUserStore: (userData: IUser) => void,
  setCitiesList: (newList: ICity[]) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  uid: '',
  name: '',
  citiesList: [],
  setUserStore: (userData) => set(userData),
  setCitiesList: (newList) => set({citiesList: newList})
}))