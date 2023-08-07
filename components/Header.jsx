import Link from 'next/link'
import styles from './Header.module.scss'

const Header = ({isFixed, setScreen}) => {
  const returnHome = (e) => {
    if (setScreen) {
      e.preventDefault()
      setScreen('welcome')
    }
  }

  const loadReceive = (e) => {
    if (setScreen) {
      e.preventDefault()
      setScreen('confession')
    }
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
          <Link href='/manifesto'>Manifesto</Link>
          <Link href='/#receive' onClick={loadReceive}>Receive Indulgence</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
