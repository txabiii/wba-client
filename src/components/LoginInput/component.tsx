import styles from './component.module.scss'
import cx from 'classnames'

import RightArrow from '@root/assets/right-arrow.svg'
import Image from 'next/image'

interface LoginInputProps {
  writtenInput?: boolean,
  google?: boolean
}

export default function LoginInput({ writtenInput = true, google }: LoginInputProps) {
    return(
    <div>
      {
        writtenInput && !google &&
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            placeholder='Continue with email...'
            className={cx(styles.input, styles.default)}
          />
          <button className={cx(styles.emailButton)}>
            <div className={styles.imgWrapper}>
              <Image src={RightArrow} alt='Continue with email button' />
            </div>
          </button>
        </div>
      }
      {
        google &&
        <button className={cx(styles.input, styles.google)}>
          Continue with Google
        </button>
      }
    </div>
  )
}