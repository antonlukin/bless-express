'use client'

import { useEffect } from 'react'
import styles from './Loader.module.scss'

const Loader = ({setScreen}) => {
  useEffect(() => {
    const showFinal = () => {
      return setScreen('final')
    }

    setTimeout(showFinal, 5000)
  }, [setScreen])

  return (
    <section className={styles.wrapper}>
      <figure className={styles.frog}></figure>

      <p className={styles.title}>
        Blessing your indulgence
      </p>
    </section>
  )
}

export default Loader