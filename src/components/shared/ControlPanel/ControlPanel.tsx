import Button from '@/components/ui/button/Button'
import styles from './controlPanel.module.css'

export default function ControlPanel() {
  return (
    <div className={styles.panel}>
      <Button 
        text={'Delete'} 
        icon={{
          src: '/icons/btns/delete.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
      />
      <Button 
        text={'Refresh'} 
        icon={{
          src: '/icons/btns/refresh.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
      />
      <Button 
        text={'Refresh All'} 
        icon={{
          src: '/icons/btns/refreshAll.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
      />
      <Button 
        text={'Settings'} 
        icon={{
          src: '/icons/btns/settings.svg',
          position: "after",
          width: 20,
          height: 20
        }} 
      />
    </div>
  )
}
