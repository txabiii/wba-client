'use client'

import styles from './page.module.scss'
import Footer from '@root/components/Footer/component'
import Button from '@root/components/Button/component'

export default function VerificiationPage() {
  return (
    <div className={styles.page}>
      <main>
        <div className={styles.container}>
          <h3>Verify your email address</h3>
          <p>To continue you using the website you must have a verified email address.</p>
          <input type="text" placeholder='6-digit code'/>
          <Button content='Verify' click={()=>{}} />
          <p>Didn&apos;t receive a code? <span onClick={()=>{}}>Click here</span></p>
        </div>
      </main>
      <Footer />
    </div>
  )
}