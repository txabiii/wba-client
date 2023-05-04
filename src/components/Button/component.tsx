import styles from './component.module.scss'
import { MouseEventHandler } from 'react'

interface ButtonProps {
  content: string
  click?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ content, click = ()=>{} }: ButtonProps){
  return(
    <button className={styles.button} onClick={click}>{ content }</button>
  )
}