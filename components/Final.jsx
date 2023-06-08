'use client'

import Header from '../components/Header'
import Button from './Button'
import styles from './Final.module.scss'

const Final = ({results}) => {
  return (
    <section className={styles.wrapper}>
      <Header />

      <h3 className={styles.title}>We bless you</h3>

      <div className={styles.share}>
        <strong>Share your indulgence</strong>

        <figure>
          <Button type='button'>Inst</Button>
          <Button type='button'>Fb</Button>
          <Button type='button'>Copy link</Button>
        </figure>
      </div>

      <div className={styles.certificate}>
        <h4>
          <span>Indulgencia Plenaria</span>
        </h4>

        <blockquote>
          <p>
            This indulgence is granted by Tiger Soda creative agency. We believe that everyone deserves a chance to move on from their past mistakes and start anew.
            <br />
            Carry this indulgence with you as a reminder of your freedom from guilt and shame.
          </p>

          <p>Live your life to the fullest, free from the weight of the past.</p>
        </blockquote>

        <figure>
          <figcaption>Type of sin</figcaption>

          <p>Did you say something you regret? Did you vote for Trump or accidentally kicked a colleague, and now you are tormented in agony</p>
        </figure>
      </div>

      <div className={styles.others}>
        {results && results.map((result, i) =>
          <figure className={styles.item} key={i}>
            <picture>
              <source srcSet={result.image} type="image/jpeg" />
              <img src={result.image} alt={result.message} width={300} height={300} />
            </picture>

            <figcaption>
              <h5>{result.message}</h5>
              <p>{result.name}</p>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}

export default Final