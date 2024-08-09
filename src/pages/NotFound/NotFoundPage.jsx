import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import nFpimg from '../../assets/nFpimg.svg'

export default function NotFoundPage() {
  return (
    <div className={styles.Box}>
      <div className={styles.image}>
        <img src={nFpimg} alt="boximg" className={styles.boximg} />
      </div>
      <div className={styles.textBox}>
        <h2>Page Not Found </h2>
        <p>We’re sorry, the page you requested could not be found.</p>
        <p> Please go back to the homepage.</p>
        <Link to="/" className={styles.linkBtn}>
          Go Home
        </Link>

      </div>
    </div>
  );
}
