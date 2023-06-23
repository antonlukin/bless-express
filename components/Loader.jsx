'use client'

import { useEffect } from 'react'
import styles from './Loader.module.scss'

const Loader = ({setScreen}) => {
  useEffect(() => {
    const showFinal = () => {
      return setScreen('final')
    }

    setTimeout(showFinal, 4500)
  }, [setScreen])

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <figure className={styles.frog}></figure>

        <p className={styles.title}>
          Blessing your indulgence
        </p>
      </div>
    </section>
  )
}

export default Loader