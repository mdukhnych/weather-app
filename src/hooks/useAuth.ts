'use client'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";

export default function useAuth() {
  const router = useRouter();
  const setUserStore = useUserStore((state) => state.setUserStore);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid)
        if (userData) {
          setUserStore({ name: userData.name, citiesList: userData.citiesList })
          router.replace(`/users/${userData.name.replace(/\s+/g, "")}`);
        } else {
          alert("Error to get UserData!!!");
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUserData = async (uid: string) => {
    const docRef = doc(FIREBASE_DB, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user.uid
      })
      .then(uid => {
        return getUserData(uid)
      })
      .then(userData => {
        if (userData) {
          setUserStore({name: userData.name, citiesList: userData.citiesList});
          router.replace(`/users/${userData.name.replace(/\s+/g, "")}`);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode)
        alert(errorMessage)
      });
  }

  const signup = (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(FIREBASE_DB, "users", user.uid), {
          name: name,
          citiesList: []
        });
      })
      .then(() => {
        setUserStore({name: name, citiesList: []});
        router.replace(`/users/${name.replace(/\s+/g, "")}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode)
        alert(errorMessage)
      });
  }

  return { login, signup, getUserData }

}
