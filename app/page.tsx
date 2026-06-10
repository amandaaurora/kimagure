import styles from './page.module.css'
import TypingGloss from './components/TypingGloss'
import ContactButton from './components/ContactButton'

export default function Page() {
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <header className={styles.topbar}>caprichos</header>
        <main className={styles.hero}>
          <div className={styles.tape}>
            <span className={styles.tapeWord} lang="ja">
              <span className={styles.ch}>気</span>
              <span className={styles.ch}>ま</span>
              <span className={styles.ch}>ぐ</span>
              <span className={styles.ch}>れ</span>
            </span>
          </div>
          <p className={styles.gloss}>
            <TypingGloss />
            <span className={styles.caret} aria-hidden="true">
              _
            </span>
          </p>
        </main>
        <footer className={styles.footer}>
          <ContactButton />
        </footer>
      </div>
    </div>
  )
}
