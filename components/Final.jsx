'use client'

import Header from '../components/Header'
import Button from './Button'
import styles from './Final.module.scss'

const Final = ({results}) => {
  console.log(results)

  const setClipboard = async (e) => {
    await navigator.clipboard.writeText(results.link);
    e.target.textContent = 'Copied!'
  }

  return (
    <section className={styles.wrapper}>
      <Header />

      <h3 className={styles.title}>We bless you</h3>

      <div className={styles.share}>
        <strong>Share your indulgence</strong>

        <figure>
          <a className={styles.button} href={results.story} download='story.jpg'>Inst</a>
          <a className={styles.button} href={results.link}>Fb</a>
          <Button
            type='button'
            onClick={setClipboard}
          >Copy link</Button>
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
          <figcaption>Type of Sin</figcaption>

          <p>{results.message}</p>
        </figure>
      </div>

      <div className={styles.others}>
        {results.users && results.users.map((user, i) =>
          <figure className={styles.item} key={i}>
            <picture>
              <source srcSet={user.image} type="image/jpeg" />
              <img src={user.image} alt={user.message} width={300} height={300} />
            </picture>

            <figcaption>
              <h5>{user.message}</h5>
              <p>{user.name}</p>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}

export default Final