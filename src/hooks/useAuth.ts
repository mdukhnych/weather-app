'use client'

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

export default function useAuth() {
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

  const signup = () => {

  }

  return { login, signup }

}
