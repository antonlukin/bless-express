'use client'

import { useEffect, useRef } from 'react'

import Link from 'next/link'
import Header from './Header'
import TitleImage from '../public/decor/manifesto-title.svg'
import styles from './Manifesto.module.scss'

const Manifesto = ({setScreen}) => {
  const ref = useRef(null)

  useEffect(() => {
    const view = Math.max(document.documentElement.clientHeight, window.innerHeight)

    const title = ref.current.querySelector(`.${styles.title}`)
    title.classList.add(styles.visible)

    const summary = ref.current.querySelector(`.${styles.summary}`)

    setTimeout(() => {
      summary.classList.add(styles.visible)
    }, 400)

    const about = ref.current.querySelector(`.${styles.about}`)

    // Get all hints figures
    const hints = ref.current.querySelectorAll(`.${styles.hints} figure`)

    const scrollHandler = () => {
      const rTitle = title.getBoundingClientRect()
      title.classList.add(styles.visible)

      if ((rTitle.height / 2) + rTitle.top <= 0) {
        title.classList.remove(styles.visible)
      }

      const rAbout = about.getBoundingClientRect()

      if (rAbout.top < view / 1.5) {
        about.classList.add(styles.visible)
      }

      hints.forEach(hint => {
        const rect = hint.getBoundingClientRect()

        if (rect.top + rect.height - view <= 80) {
          hint.classList.add(styles.visible)
        }
      })
    }

    window.addEventListener('scroll', scrollHandler)
  }, [])

  return (
    <section className={styles.wrapper} ref={ref}>
      <Header />

      <div className={styles.inner}>
        <h2 className={styles.title} aria-label='Manifesto'>
          <TitleImage />
        </h2>

        <div className={styles.summary}>
          <p>We all sometimes do, feel, or say things we’re not proud of. Some of them are still embarrassing years later. It’s 3 AM, but your conscience is pretty much awake, and you feel like a bad person, like somebody useless and unworthy. Sound familiar?</p>
        </div>

        <div className={styles.about}>
          <div className={styles.description}>
            <p>The good news is that you are worthy because of these thoughts. It’s only the sociopaths who don’t have regrets. Guilt and shame initially appeared as part of a mechanism that helps us grow. But when you fixate on or suppress these feelings, instead of learning the lesson and moving forward, this is where anxiety, panic attacks, and depression can set in.</p>
            <p>Mistakes are normal.</p>
            <p>Procrastination is normal.</p>
            <p>Every feeling is normal.</p>
            <p>Feeling sorry for some silly trick, rude words, cruel deeds, or inaction is normal, too.</p>
            <p>You can’t change what happened, but you can let it go. That’s why we, a gang of creative and highly sensitive types from our agency, made this site. Indulgence will become tangible proof that from now on you are free to live your better life. Share the technique with those who need it, and let’s make the world a better place together!</p>
          </div>

          <div className={styles.hints}>
            <figure className={styles.item}>
              <picture>
                <source srcSet="/decor/manifesto-1.png" type="image/png" />
                <img src="/decor/manifesto-1.png" alt="It is OK to spend all your free time in games" width={371} height={557} />
              </picture>

              <figcaption>
                <h5>It is OK to spend all your free time in games</h5>
              </figcaption>
            </figure>

            <figure className={styles.item}>
              <picture>
                <source srcSet="/decor/manifesto-2.png" type="image/png" />
                <img src="/decor/manifesto-2.png" alt="It's OK to feel irresistible regardless of what others think" width={388} height={559} />
              </picture>

              <figcaption>
                <h5>It is OK to feel irresistible regardless of what others think</h5>
              </figcaption>
            </figure>

            <figure className={styles.item}>
              <picture>
                <source srcSet="/decor/manifesto-3.png" type="image/png" />
                <img src="/decor/manifesto-3.png" alt="It's okay to sit on the toilet in tiktok" width={412} height={528} />
              </picture>

              <figcaption>
                <h5>It is okay to sit on the toilet in tiktok</h5>
              </figcaption>
            </figure>
          </div>

          <div className={styles.receive}>
            <Link className={styles.button} href='/'>Receive indulgence</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Manifesto