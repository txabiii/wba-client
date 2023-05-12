'use client';

import styles from './page.module.scss'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

import { logOut  as userClientLogOut, checkVerification } from "@root/api/userClient";

export default function Workspace() {
  const router = useRouter()

  const logOut = () => {
    userClientLogOut()
    router.push('/')
  }

  useEffect(()=>{
    async function verify() {
      const result = await checkVerification()
      if(result.status !== 200) {
        router.push('/verification')
      } else {
        
      }
    }
    verify()
  })

  return(
    <div className={styles.workspace}>
      <div className={styles.files}></div>
      <main>
        <h1>Welcome to workspace</h1>
        <button onClick={logOut}>Log out</button>
      </main>
    </div>
  )
}