import Search from '@/components/shared/Search/Search';
import styles from './userpage.module.css';
import CitiesList from '@/components/shared/CitiesList/CitiesList';
import Deatils from '@/components/shared/Details/Deatils';
import ControlPanel from '@/components/shared/ControlPanel/ControlPanel';

export default function UserPage() {

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Search />
        <ControlPanel />
      </header>
      <div className={styles.content}>
        <CitiesList />
        <Deatils />
      </div>
    </main>
  )
}
