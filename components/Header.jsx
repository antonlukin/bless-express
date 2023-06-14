import Link from 'next/link'
import styles from './Header.module.scss'

const Header = ({isFixed}) => {
  const classes = [styles.wrapper]

  if (isFixed) {
    classes.push(styles.fixed)
  }

  return (
    <header className={classes.join(' ')}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>BND</h1>

        <nav className={styles.menu}>
          <Link href='/manifest'>Manifest</Link>
          <Link href='/'>Receive Indulgence</Link>

          <p>
            <span>Created by </span>
            <a href='https://tigersoda.agency' target='_blank' rel='noopener'>Tiger Soda</a>
          </p>
        </nav>
      </div>
    </header>
  )
}

export default Header