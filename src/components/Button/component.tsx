import styles from './component.module.scss'
import cx from 'classnames'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'

interface ButtonProps {
  content: string
  click: MouseEventHandler<HTMLButtonElement>
  loading?: boolean
}

export default function Button({ content, click, loading = false }: ButtonProps){
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(()=>{
    if(loading) {      
      if(buttonRef.current) {
        buttonRef.current.style.color = 'transparent'
        buttonRef.current.style.pointerEvents = 'none'
      }
    } else {
      if(buttonRef.current) {
        buttonRef.current.style.color = 'white'
        buttonRef.current.style.pointerEvents = 'unset'
      }
    }
  }, [loading])

  return(
    <button ref={buttonRef} className={styles.button} onClick={click}>
      { content }
      { loading && <div className={cx(styles.loadingAnimation)}>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
          <div className={styles.loadingCircle}></div>
        </div> }
    </button>
  )
}