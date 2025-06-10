'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import useAuth from '@/hooks/useAuth'
import useWeather from '@/hooks/useWeather'

export default function AuthProvider() {
  const { getUserData, setUser } = useAuth();
  const { getWeather } = useWeather()

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid)
        if (userData) {
          const citiesList = []
          for (const city of userData.citiesList) {
            const weather = await getWeather({city: city})
            citiesList.push({...city, weather})
          }
          setUser(userData.uid, userData.name, citiesList)
        } else {
          alert("Error to get user data!!!")
        }
        // setIsLoading(false)
      } else {
        // setIsLoading(false)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null 
}
