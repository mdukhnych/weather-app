'use client'

import { useState } from 'react';
import Spinner from '@/components/ui//spinner/Spinner'
import styles from './authForm.module.css';
import useAuth from '@/hooks/useAuth';

export default function AuthForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login, signup, isLoading, setIsLoading } = useAuth()

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isSignup) {
        await signup(email, password, name)
      } else {
        await login(email, password)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      { isSignup && <input className={styles.input} value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Enter your name...' /> }
      <input className={styles.input} value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Enter your email...' />
      <div className={styles.passwordContainer}>
        <input className={styles.input} value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder='Enter your password...' />
        <button type='button' className={styles.eyeBtn} onClick={() => setShowPassword(prev => !prev)}>
          {
            showPassword ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </button>
      </div>
      <div className={styles.footer}>
        { isLoading ? <Spinner width="39px" height="39px" /> : <button type="submit" className='btn'>{ isSignup ? "Sign Up" : "Log In" }</button> }
        <span className={styles.span} onClick={() => setIsSignup(prev => !prev)}>{ isSignup ? "Already have an account? Log in" : "Don't have an account yet? Sign up" }</span>
      </div>
    </form>
  )
}
