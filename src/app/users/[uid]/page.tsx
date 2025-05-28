'use client'

import Search from '@/components/shared/Search/Search';
import styles from './userpage.module.css';
import CitiesList from '@/components/shared/CitiesList/CitiesList';
import Deatils from '@/components/shared/Details/Deatils';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../../firebaseConfig';

export default function UserPage() {

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Search />
        <div className={styles.btnsPanel}>
          <button type='button'>Delete</button>
          <button type='button'>Update</button>
          <button type='button'>Update All</button>
          <button type='button' onClick={() => {
            signOut(FIREBASE_AUTH)
          }}>Settings</button>
        </div>
      </header>
      <div className={styles.content}>
        <CitiesList />
        <Deatils />
      </div>
    </main>
  )
}
