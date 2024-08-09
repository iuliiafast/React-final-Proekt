import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { openModal } from '../../redux/modalSlice';
import { clearCart } from '../../redux/cartSlice';
import styles from './Order.module.css';

export default function Order() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.discontPrice || item.price) * item.quantity,
    0
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const formatPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    totalPrice
  );


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !address) {
      alert('Please fill out all fields.');
      return;
    }

    dispatch(
      openModal({
        title: 'Order Placed',
        content: (
          <>
            <p>Your order has been placed successfully.</p>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </>
        ),
      })
    );

    dispatch(clearCart());

    setName('');
    setEmail('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.orderForm}>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.placeholderCartOrder}
          placeholder="Name"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.placeholderCartOrder}
          placeholder="Phone number"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.placeholderCartOrder}
          placeholder="Email"
          required
        />
      </div>
    </form>
  );
}