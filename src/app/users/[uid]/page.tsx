'use client'

import { signOut } from "firebase/auth";
import Link from "next/link";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";

export default function UserPage() {

  return (
    <div>
      <Link  href={'/'} onClick={() => signOut(FIREBASE_AUTH)}>Logout</Link>
    </div>
  )
}
