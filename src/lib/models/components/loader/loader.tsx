import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={`loader ${styles.loader}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
