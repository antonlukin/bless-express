'use client'

import { useEffect, useRef } from 'react'

import ArchImage from '../public/decor/church-arch.svg'
import styles from './Church.module.scss'

const Church = () => {
  const refWall = useRef(null)

  const showConfession = () => {
    setTimeout(() => {
      document.body.setAttribute('data-screen', 'confession')
    }, 800)
  }

  const showTransition = () => {
    setTimeout(() => {
      document.body.setAttribute('data-screen', 'transition')

      showConfession()
    }, 2000)

    refWall.current.setAttribute('data-opened', '')
  }

  useEffect(() => {
    const view = Math.max(document.documentElement.clientHeight, window.innerHeight)

    document.body.addEventListener('scroll', () => {
      const rect = refWall.current.getBoundingClientRect()

      if (rect.top - view <= 0) {
        refWall.current.setAttribute('data-appear', '')
      }
    })
  }, [])

  return (
    <section className={styles.wrapper}>
      <div className={styles.wall} ref={refWall}>
        <picture className={styles.window}>
          <source srcSet="/decor/church-1.jpg" type="image/jpeg" />
          <img src="/decor/church-1.jpg" alt="Church image" width={395} height={1092} />
        </picture>

        <picture className={styles.window}>
          <source srcSet="/decor/church-2.jpg" type="image/jpeg" />
          <img src="/decor/church-2.jpg" alt="Church image" width={420} height={1210} />
        </picture>

        <figure className={styles.door} onClick={showTransition} role='button'>
          <ArchImage />

          <p>Knock when you are ready</p>
        </figure>

        <picture className={styles.window}>
          <source srcSet="/decor/church-3.jpg" type="image/jpeg" />
          <img src="/decor/church-3.jpg" alt="Church image" width={420} height={1210} />
        </picture>

        <picture className={styles.window}>
          <source srcSet="/decor/church-4.jpg" type="image/jpeg" />
          <img src="/decor/church-4.jpg" alt="Church image" width={394} height={1092} />
        </picture>
      </div>
    </section>
  );
}

export default Church;