import styles from './Modal.module.css';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.ModalContent} onClick={stopPropagation}>
        {children}
        <button className={`${styles.ModalButton} ${styles.cancel}`} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;