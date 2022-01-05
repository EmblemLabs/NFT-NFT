import styles from './NotFound.module.sass';

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.detailColumn}>
        <div className={styles.header}>Apologies!</div>
        <div className={styles.details}>We cannot seem to find the page you're looking for.</div>
        <div className={styles.errorCode}>Error code: 404</div>
      </div>
    </div>
  );
};

export default NotFound;
