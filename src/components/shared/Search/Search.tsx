'use client'

import styles from './search.module.css'
import clsx from 'clsx'
import Spinner from '@/components/ui/spinner/Spinner'
import useSearch from '@/hooks/useSearch'

export default function Search() {
  const {
    value,
    setValue,
    list,
    isLoading,
    addCity,
    clearSearchField
  } = useSearch()

  const isListShown = list.length > 0

  return (
    <div className={clsx(styles.container, isListShown && styles.listShow)}>
      <input value={value} onChange={e => setValue(e.target.value)} className={styles.input} type="text" placeholder='Enter city name...' />
      {
        isLoading ? <Spinner width="24px" height="24px" styles={{marginRight: "15px"}} />
        : <button className={styles.searchBtn} type='button' onClick={clearSearchField}>
            {
              list.length === 0 ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            }
          </button>
      }
      <ul className={clsx(styles.list, isListShown && styles.listShow)}>
        {
          list.map((city: ICity, i: number) => <li key={i} className={styles.listItem} onClick={() => addCity(city)}>{`${city.name}, ${city.state}, ${city.country}`}</li>)
        }
      </ul>
    </div>
  )
}
