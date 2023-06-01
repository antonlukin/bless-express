'use client'

import { useEffect, useRef } from 'react'

import TitleImage from '../public/decor/title-text.svg'
import styles from './Welcome.module.scss'

const Welcome = () => {
  const refDescription = useRef(null)

  useEffect(() => {
    // Get all description elements
    const texts = refDescription.current.querySelectorAll('p')

    // Get all hints figures
    const hints = refDescription.current.querySelectorAll('figure')

    document.body.addEventListener('scroll', () => {
      const view = Math.max(document.documentElement.clientHeight, window.innerHeight)

      hints.forEach(hint => {
        const rect = hint.getBoundingClientRect()

        if (rect.top + rect.height - view <= 0) {
          hint.setAttribute('data-visible', '')
        } else {
          hint.removeAttribute('data-visible')
        }
      })

      texts.forEach(text => {
        const rect = text.getBoundingClientRect()

        if (rect.top <= 50) {
          text.setAttribute('data-hidden', true)
        } else {
          text.removeAttribute('data-hidden', true)
        }
      })
    })
  }, [])

  return (
    <section className={styles.wrapper}>
      <div className={styles.description} ref={refDescription}>
        <p>Have you ever done something bad or really stupid? Like, you know, stealing money from your granny as a child or laughing at an odd-looking homeless person?</p>
        <p>Do you <span data-seal>still</span> remember the day when you failed the interview for your dream job or the night when you were too shy to tell her that you loved her? Maybe you hate yourself for some of your thoughts or feelings?</p>
        <p>It’s time to get <span data-fish>rid of</span> shame and start a guilt-free life! Let us save your sanity with the ancient technique of ‘<a href='https://en.wikipedia.org/wiki/Indulgence' target='_blank' rel='_noopener'>Indulgence</a>’, which first appeared in Europe more than 1,000 years ago. </p>
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
    </section>
  );
}

export default Welcome;