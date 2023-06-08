'use client'

import { useEffect, useRef } from 'react'

import Header from '../components/Header'
import ArchImage from '../public/decor/church-arch.svg'
import TitleImage from '../public/decor/welcome-title.svg'
import styles from './Welcome.module.scss'

const Welcome = ({setScreen}) => {
  const ref = useRef(null)

  useEffect(() => {
    // Get all description elements
    const texts = ref.current.querySelectorAll(`.${styles.description} p`)

    // Get all hints figures
    const hints = ref.current.querySelectorAll(`.${styles.hints} figure`)

    // Get windows element
    const vitral = ref.current.querySelector(`.${styles.vitral}`)

    const scrollHandler = () => {
      const view = Math.max(document.documentElement.clientHeight, window.innerHeight)

      hints.forEach(hint => {
        const rect = hint.getBoundingClientRect()
        hint.classList.remove(styles.visible)

        if (rect.top + rect.height - view <= 0) {
          hint.classList.add(styles.visible)
        }
      })

      texts.forEach(text => {
        const rect = text.getBoundingClientRect()
        text.classList.remove(styles.hidden)

        if (rect.top <= 50) {
          text.classList.add(styles.hidden)
        }
      })

      const rect = vitral.getBoundingClientRect()

      if (rect.top - view <= 0) {
        vitral.classList.add(styles.appear)
      }
    }

    ref.current.addEventListener('scroll', scrollHandler)
  }, [])

  const showTransition = () => {
    const vitral = ref.current.querySelector(`.${styles.vitral}`)

    vitral.classList.add(styles.opened)

    setTimeout(() => {
      setScreen('confession')
    }, 2000)
  }

  return (
    <section className={styles.wrapper} ref={ref}>
      <Header isFixed={true} />

      <div className={styles.start}>
        <div className={styles.description}>
          <p>Have you ever done something bad or really stupid? Like, you know, stealing money from your granny as a child or laughing at an odd-looking homeless person?</p>
          <p>Do you <span className={styles.seal}>still</span> remember the day when you failed the interview for your dream job or the night when you were too shy to tell her that you loved her? Maybe you hate yourself for some of your thoughts or feelings?</p>
          <p>It’s time to get <span className={styles.fish}>rid of</span> shame and start a guilt-free life! Let us save your sanity with the ancient technique of ‘<a href='https://en.wikipedia.org/wiki/Indulgence' target='_blank' rel='_noopener'>Indulgence</a>’, which first appeared in Europe more than 1,000 years ago. </p>
          <p>Now go scroll for redemption!</p>

          <div className={styles.hints}>
            <figure className={styles.item}>
              <picture>
                <source srcSet="/decor/welcome-1.png" type="image/png" />
                <img src="/decor/welcome-1.png" alt="Knock on the door image" width={351} height={311} />
              </picture>

              <figcaption>
                <h5>Knock on the door</h5>
              </figcaption>
            </figure>

            <figure className={styles.item}>
              <picture>
                <source srcSet="/decor/welcome-2.png" type="image/png" />
                <img src="/decor/welcome-2.png" alt="Make a confession about what you did, thought, or felt image" width={214} height={271} />
              </picture>

              <figcaption>
                <h5>Make a confession about what you did, thought, or felt</h5>
              </figcaption>
            </figure>

            <figure className={styles.item}>
              <picture>
                <source srcSet="/decor/welcome-3.png" type="image/png" />
                <img src="/decor/welcome-3.png" alt="Receive an indulgence image" width={320} height={338} />
              </picture>

              <figcaption>
                <h5>Receive an indulgence</h5>
              </figcaption>
            </figure>
          </div>
        </div>

        <h2 className={styles.title} aria-label='Blessed not Depressed'>
          <TitleImage />
        </h2>
      </div>

      <div className={styles.church}>
        <div className={styles.vitral}>
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
      </div>
    </section>
  )
}

export default Welcome