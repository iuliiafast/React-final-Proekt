import styles from './QuantityButtons.module.css';

export default function QuantityButtons({
  quantity,
  onDecrement,
  onIncrement,
}) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onDecrement}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button className={styles.button} onClick={onIncrement}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5V19" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      </button>
    </div>
  );
}
