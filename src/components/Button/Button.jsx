import styles from "./Button.module.css";

const Button = ({ children, onClick, isActive }) => {
  return (
    <button
      className={isActive ? `${styles.Button} ${styles.Active}` : styles.Button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};



export default Button;
