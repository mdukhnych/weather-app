'use client'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { useState } from "react";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
    
  const router = useRouter();
  const setUserStore = useUserStore((state) => state.setUserStore);

  const getUserData = async (uid: string) => {
    const docRef = doc(FIREBASE_DB, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }

  const setUser = (uid: string, name: string, citiesList: ICity[]) => {
    setUserStore({uid, name, citiesList});
    router.replace(`/users/${name.replace(/\s+/g, "")}`);
  }

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const uid = userCredential.user.uid;
      const userData = await getUserData(uid);
      if (userData) {
        setUser(userData.uid, userData.name, userData.citiesList);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.code);
      alert(error.message);
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const uid = userCredential.user.uid;
      await setDoc(doc(FIREBASE_DB, "users", uid), {
        uid,
        name,
        citiesList: []
      });
      setUser(uid, name, []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.code);
      alert(error.message);
      throw error;
    }
  }

  return { isLoading, setIsLoading, login, signup, getUserData, setUser }

}
