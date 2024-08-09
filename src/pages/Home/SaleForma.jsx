/*import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './SaleForma.module.css';
import axios from 'axios';
import buttonStyles from './ButtonStyles.module.css';

export default function SaleForma() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !address) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`http://localhost:3333/order/send`, {
        name,
        email,
        address,
      });

      if (response.status === 200) {
        setSubmitStatus('success');
        alert('Order successfully placed!');
        setName('');
        setEmail('');
        setAddress('');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('There was an error placing the order!', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова позже.');
    } finally {
      setIsSubmitting(false);
    }
  };
  function renderBtnText() {
    if (submitStatus === 'success') {
      return 'Request Submitted'
    }
    return 'Get a discount'
  }

  return (
    <div className={styles.formaSale}>
      <form onSubmit={handleSubmit} className={styles.orderForm}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.placeholderCartOrder}
            placeholder="Имя"
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
            placeholder="Электронная почта"
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
            placeholder="Адрес"
            required
          />
        </div>
        <button
          type="submit"
          className={`${buttonStyles.button} ${isSubmitting ? buttonStyles.loading : submitStatus === 'success' ? buttonStyles.success : buttonStyles.default}`}
          disabled={isSubmitting}
        >
          {renderBtnText()}
        </button>
      </form>
    </div>
  );
}

import { useDispatch } from 'react-redux';*/


import { useState } from 'react';
import axios from 'axios';
import styles from './SaleForma.module.css';
import buttonStyles from './ButtonStyles.module.css';

export default function SaleForma() {
  //const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !phone || !email) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`http://localhost:3333/order/send`, {
        name,
        phone,
        email,
      });

      if (response.status === 200) {
        setSubmitStatus('success');
        alert('Заказ успешно оформлен!');
        setName('');
        setPhone('');
        setEmail('');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Произошла ошибка при оформлении заказа!', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBtnText = () => {
    if (submitStatus === 'success') {
      return 'Request Submitted';
    }
    return 'Get a discount';
  };

  return (
    <div className={styles.formaSale}>
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
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.placeholderCartOrder}
            placeholder="Phone number"
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
            placeholder="Email"
            required
          />
        </div>
        <button
          type="submit"
          className={`${buttonStyles.button} ${isSubmitting
            ? buttonStyles.loading
            : submitStatus === 'success'
              ? buttonStyles.success
              : ''
            }`}
          disabled={isSubmitting}
        >
          {renderBtnText()}
        </button>
      </form>
    </div>
  );
}
