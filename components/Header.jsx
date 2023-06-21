import Link from 'next/link'
import styles from './Header.module.scss'

const Header = ({isFixed, setScreen}) => {
  const returnHome = (e) => {
    e.preventDefault()

    setScreen('welcome')
  }

  const classes = [styles.wrapper]

  if (isFixed) {
    classes.push(styles.fixed)
  }

  return (
    <header className={classes.join(' ')}>
      <div className={styles.inner}>
        <Link href='/' onClick={returnHome}>
          <h1 className={styles.logo}>BND</h1>
        </Link>

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