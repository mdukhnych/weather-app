'use client'

import Image from 'next/image'
import styles from './button.module.css'
import clsx from 'clsx';

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
  additionalStyles?: {
    [key: string]: string;
  },
  onClick: () => void
}

export default function Button({
  type = "button", 
  text = null,
  icon,
  additionalStyles,
  onClick
}: IButton) {

  return (
    <button
      className={clsx(styles.btn)}
      type={type}
      onClick={onClick}
      style={additionalStyles}
    >
      { icon && icon.position == "before" ? <Image src={icon.src} alt='Icon' height={icon.height} width={icon.width} /> : null }
      { text && <span className={styles.btnText}>{ text ? text : null }</span> }
      { icon && icon.position == "after" ? <Image src={icon.src} alt='Icon' height={icon.height} width={icon.width} /> : null }
    </button>
  )
}
