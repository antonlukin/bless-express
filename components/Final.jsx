import Button from './Button'
import styles from './Final.module.scss'

const Final = () => {
  return (
    <section className={styles.wrapper}>
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
        <figure className={styles.item}>
          <picture>
            <source srcSet="/others/1.jpg" type="image/jpeg" />
            <img src="/others/1.jpg" alt="Other sin" width={300} height={300} />
          </picture>

          <figcaption>
            <h5>I blew up my work project</h5>
            <p>Noah</p>
          </figcaption>
        </figure>

        <figure className={styles.item}>
          <picture>
            <source srcSet="/others/2.jpg" type="image/jpeg" />
            <img src="/others/1.jpg" alt="Other sin" width={300} height={300} />
          </picture>

          <figcaption>
            <h5>I’ve been watching Tiktoks instead of living life</h5>
            <p>Iren</p>
          </figcaption>
        </figure>

        <figure className={styles.item}>
          <picture>
            <source srcSet="/others/2.jpg" type="image/jpeg" />
            <img src="/others/1.jpg" alt="Other sin" width={300} height={300} />
          </picture>

          <figcaption>
            <h5>I’ve been watching Tiktoks instead of living life</h5>
            <p>Iren</p>
          </figcaption>
        </figure>

        <figure className={styles.item}>
          <picture>
            <source srcSet="/others/2.jpg" type="image/jpeg" />
            <img src="/others/1.jpg" alt="Other sin" width={300} height={300} />
          </picture>

          <figcaption>
            <h5>I’ve been watching Tiktoks instead of living life</h5>
            <p>Iren</p>
          </figcaption>
        </figure>

        <figure className={styles.item}>
          <picture>
            <source srcSet="/others/2.jpg" type="image/jpeg" />
            <img src="/others/1.jpg" alt="Other sin" width={300} height={300} />
          </picture>

          <figcaption>
            <h5>I’ve been watching Tiktoks instead of living life</h5>
            <p>Iren</p>
          </figcaption>
        </figure>

        <figure className={styles.item}>
          <picture>
            <source srcSet="/others/2.jpg" type="image/jpeg" />
            <img src="/others/1.jpg" alt="Other sin" width={300} height={300} />
          </picture>

          <figcaption>
            <h5>I’ve been watching Tiktoks instead of living life</h5>
            <p>Iren</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default Final;