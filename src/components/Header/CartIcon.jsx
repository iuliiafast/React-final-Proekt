import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasketIcon from '../../assets/icempty.svg';
import styles from './CartIcon.module.css';

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.cartIcon}>
      <Link to="/cart">
        <img src={BasketIcon} alt="Basket" className={styles.basketIcon} />
        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
      </Link>
    </div>
  );
};

export default CartIcon;