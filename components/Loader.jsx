import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <section className={styles.wrapper}>
      <figure className={styles.frog}></figure>

      <p className={styles.title}>
        Blessing your indulgence
      </p>
    </section>
  );
}

export default Loader;