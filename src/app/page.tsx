'use client';

import styles from './page.module.scss'

import DemoObject from '@root/components/DemoObject/component'

export default function Home() {
  return(
    <div>
      <div className={styles.home}>
        <aside>
        <DemoObject/>
        </aside>
      </div>
    </div>
  )
}