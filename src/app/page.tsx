import styles from './page.module.scss'

export default function Home() {
  return(
    <div className={styles.home}>
      <main>
        {/* HERO SECTION */}
        <section className={styles.feature}>
          <div className={styles.top}>
            <div className={styles.header}>
              <div className={styles.brand}>
                <h4>GENIEOUS</h4>
                <h6>CREATIVE WRITING</h6>
              </div>
              <div className={styles.beta}>BETA</div>
            </div>
            <div className={styles.content}>
              <h1>World-building for the future</h1>
              <h3><i>Human-first, AI-assisted</i></h3>
              <p>Hear ye! Hear ye! A new era of creative writing has come upon us. With Genieous Creative Writing, with the help of AI has never been easier than before. The only limitations are your mind and will-power.</p>
            </div>
          </div>
          <div className={styles.bottom}>

          </div>
        </section>
        {/* FEATURE #1 */}
        <section className={styles.feature}>
          <div className={styles.top}>

          </div>
          <div className={styles.bottom}>

          </div>
        </section>
        <section className={styles.feature}>
          {/* ADD FEATURE */}
        </section>
        <section className={styles.feature}>
          {/* ADD FEATURE */}
        </section>
      </main>
      <aside>

      </aside>
    </div>
  )
}
