'use client'

import Header from '../components/Header'
import Button from './Button'
import styles from './Final.module.scss'

const Final = ({results, setScreen}) => {
  const setClipboard = async (e) => {
    await navigator.clipboard.writeText(results.link);
    e.target.textContent = 'Copied!'
  }

  return (
    <section className={styles.wrapper}>
      <Header setScreen={setScreen} />

      <div className={styles.inner}>
        <h3 className={styles.title}>We bless you</h3>

        <div className={styles.share}>
          <strong>Share your indulgence</strong>

          <figure>
            <a className={styles.button} href={results.story} download='story.jpg'>Inst</a>
            <a className={styles.button} href={'https://www.facebook.com/sharer/sharer.php?u=' + results.link} target='_blank' rel='noopener'>Fb</a>
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
            <p>Our agency grants this indulgence for a fresh start, free from guilt and <span className={styles.fish}>shame.</span></p>
            <p>Let it serve you as a reminder to live life to the fullest, unburdened by the weight of the past.</p>
          </blockquote>
        </div>

        <div className={styles.others}>
          {results.users && results.users.map((user, i) =>
            <figure className={styles.item} key={i}>
              <picture>
                <source srcSet={user.image} type="image/jpeg" />
                <img src={user.image} alt={user.message} width={300} height={300} />
              </picture>

              <figcaption>
                <h5 dangerouslySetInnerHTML={{__html: user.message }} />
                <p dangerouslySetInnerHTML={{__html: user.name }} />
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}

export default Final