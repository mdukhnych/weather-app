'use client'

import { useUserStore } from "@/store/user";
import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { getWeather } from "@/services/weather";

export default function useSearch() {
  const [value, setValue] = useState('')
  const [list, setList] = useState<ICity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { uid, citiesList, setCitiesList } = useUserStore(state => state)

  const clearSearchField = () => {
    setValue('')
    setList([])
  }

  const getCitiesByName = async (limit:number = 5) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
      const data = await response.json()
      setList(data)
    } catch (error) {
      console.error('Error fetching cities:', error)
      alert("Error fetching cities")
    }
  }

  const searchBtnClickHandler = async () => {
    if (!value.trim()) return
    if (list.length > 0) {
      clearSearchField()
      return
    }

    setIsLoading(true)
    await getCitiesByName()
    setIsLoading(false)
  }

  const addCity = async (city: ICity) => {
    if (citiesList.some(c => c.lat === city.lat && c.lon === city.lon)) {
      alert(`This city is already on the list`)
      return
    }
    try {
        const userDocRef = doc(FIREBASE_DB, "/users", uid);
        await updateDoc(userDocRef, {
            citiesList: arrayUnion(city),
        });
    } catch (error) {
        console.error("Error to add a new city: ", error);
    }
    const weather = await getWeather(city)
    city.weather = weather
    setCitiesList([...citiesList, city])
    clearSearchField()
  }

  return { 
    value, 
    setValue, 
    list, 
    setList, 
    isLoading, 
    setIsLoading, 
    getCitiesByName, 
    searchBtnClickHandler, 
    addCity
  }
}
