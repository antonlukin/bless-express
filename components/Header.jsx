import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link href='/'>BND</Link>
        </h1>

        <nav className={styles.menu}>
          <Link href=''>Manifest</Link>
          <Link href=''>Get Indulgence</Link>

          <p>
            <span>Created by </span>
            <a href='https://tigersoda.agency' target='_blank' rel='noopener'>Tiger Soda</a>
          </p>
        </nav>
      </div>
    </header>
  );
}

export default Header;