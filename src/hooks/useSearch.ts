'use client'

import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { useActiveCityStore } from "@/store/activeCity";
import useWeather from "./useWeather";

export default function useSearch() {
  const [value, setValue] = useState('')
  const [list, setList] = useState<ICity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { uid, citiesList, setCitiesList } = useUserStore(state => state)
  const { activeIndex, setActiveIndex } = useActiveCityStore(state => state)
  const { getWeather } = useWeather()

  useEffect(() => {
    if (value.length > 0) {
      setIsLoading(true)
      const timeout = setTimeout(() => {
        citySearchHandler()
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(timeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const clearSearchField = () => {
    setValue('')
    setList([])
    setIsLoading(false)
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

  const citySearchHandler = async () => {
    if (!value.trim()) return
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
    const weather = await getWeather({city: city})
    city.weather = weather
    setCitiesList([...citiesList, city])
    clearSearchField()
  }

  const deleteCity = async () => {
    const ref = doc(FIREBASE_DB, 'users', uid)
    const newCitiesList = citiesList;

    newCitiesList.splice(activeIndex, 1)
    setCitiesList(newCitiesList)
    await updateDoc(ref, { citiesList: newCitiesList })
    setActiveIndex(0)
  }

  return { 
    value, 
    setValue, 
    list, 
    setList, 
    isLoading, 
    setIsLoading, 
    getCitiesByName, 
    citySearchHandler, 
    addCity,
    deleteCity,
    clearSearchField
  }
}
