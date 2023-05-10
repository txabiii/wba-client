'use client'

import styles from './page.module.scss'
import cx from 'classnames'
import Footer from '@root/components/Footer/component'
import Button from '@root/components/Button/component'

import { sendEmail, verifyCode } from '@root/api/userClient'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerificiationPage() {
  const router = useRouter();

  const [initial, setInitial] = useState(true)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<number | undefined>()

  const handleSendEmail = async () => {
    setLoading(true)
    const response = await sendEmail()
    if(response.status == 200) {
      setInitial(false)
    } else {
      //do something 'email failed to send please try again'
    }
    setLoading(false)
  }

  const handleVerify = async () => {
    setLoading(true)
    if(!code) return

    const response = await verifyCode(code)
    if(response.status === 200) router.push('/workspace')
    else //do something 'code is incorrect'
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <main>
        <div className={cx(styles.container, { [styles.blueButton] : !initial})}>
          <h3>Verify your email address</h3>
          <p>To continue you using the website you must have a verified email address.</p>
          <input 
            type="number" 
            placeholder='6-digit code'
            value={code}
            onChange={(e)=>{
              if(e.target.value.length > 6) return
              setCode(parseInt(e.target.value))
            }}
          />
          {
            initial === true && 
            <Button content='Send email' click={handleSendEmail} loading={loading}/>
          }
          {
            initial === false &&
            <Button content='Verify' click={handleVerify} loading={loading}/>
          }
          <p>Didn&apos;t receive a code? <span onClick={()=>{}}>Click here</span></p>
        </div>
      </main>
      <Footer />
    </div>
  )
}