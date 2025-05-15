import AuthForm from "@/components/shared/AuthForm/AuthForm";
import Image from "next/image";

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={'/umbrela.png'} alt="umbrela" width={150} height={150}/>
      </div>
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Weather App</h3>
        <AuthForm />
      </div>
    </div>
  );
}
