import Button from './Button'
import styles from './Confession.module.scss'

const Confession = () => {
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.caption}>What&apos;s bothering you, my child</h3>

      <form action="#" className={styles.form} method='GET'>
        <p>
          <textarea placeholder='My sin...'></textarea>
        </p>

        <p>
          <input type='text' placeholder='Send it by email' />
        </p>

        <p>
          <input type='text' placeholder='Name' />
        </p>

        <label className={styles.switcher}>
          <strong>Anonymous</strong>

          <input type="checkbox" />
          <span>Toggle</span>
        </label>

        <p>
          <Button type='submit'>Receive indulgence</Button>
        </p>
      </form>
    </section>
  );
}

export default Confession;