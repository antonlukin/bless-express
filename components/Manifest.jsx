import Header from './Header'

import TitleImage from '../public/decor/manifest-title.svg'
import styles from './Manifest.module.scss'

const Manifest = () => {
  return (
    <section className={styles.wrapper}>
      <Header />

      <h2 className={styles.title} aria-label='Manifest'>
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
          <p>You can’t change what happened, but you can let it go. That’s why we, a gang of creative and highly sensitive types from Tiger Soda agency, made this site. Indulgence will become tangible proof that from now on you are free to live your better life. Share the technique with those who need it, and let’s make the world a better place together!</p>
        </div>

        <div className={styles.hints}>
          <figure className={styles.item}>
            <picture>
              <source srcSet="/decor/manifest-1.png" type="image/png" />
              <img src="/decor/manifest-1.png" alt="It is OK to spend all your free time in games" width={371} height={557} />
            </picture>

            <figcaption>
              <h5>It is OK to spend all your free time in games</h5>
            </figcaption>
          </figure>

          <figure className={styles.item}>
            <picture>
              <source srcSet="/decor/manifest-2.png" type="image/png" />
              <img src="/decor/manifest-2.png" alt="It's OK to feel irresistible regardless of what others think" width={388} height={559} />
            </picture>

            <figcaption>
              <h5>It is OK to feel irresistible regardless of what others think</h5>
            </figcaption>
          </figure>

          <figure className={styles.item}>
            <picture>
              <source srcSet="/decor/manifest-3.png" type="image/png" />
              <img src="/decor/manifest-3.png" alt="It's okay to sit on the toilet in tiktok" width={412} height={528} />
            </picture>

            <figcaption>
              <h5>It is okay to sit on the toilet in tiktok</h5>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Manifest