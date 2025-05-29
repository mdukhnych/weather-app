import Image from 'next/image'
import styles from './button.module.css'

interface IBtnIcon {
  src: string,
  position: "before" | "after",
  height: number,
  width: number
}

interface IButton {
  type?: "button" | "submit" | "reset",
  text?: string | null,
  icon?: IBtnIcon,
}

export default function Button({
  type = "button", 
  text = null,
  icon,
}: IButton) {

  return (
    <button
      className={styles.btn}
      type={type}
    >
      { icon && icon.position == "before" ? <Image src={icon.src} alt='Icon' height={icon.height} width={icon.width} /> : null }
      <span className={styles.btnText}>{ text ? text : null }</span>
      { icon && icon.position == "after" ? <Image src={icon.src} alt='Icon' height={icon.height} width={icon.width} /> : null }
    </button>
  )
}
