'use client'

import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import useAuth from '@/hooks/useAuth'

export default function AuthProvider() {
  const { getUserData, setUser } = useAuth();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid)
        if (userData) {
          setUser(userData.uid, userData.name, userData.citiesList)
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
