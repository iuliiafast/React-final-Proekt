/*
/*</div>
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearCart, addToCart, incrementQuantity, decrementQuantity } from '../../redux/cartSlice';
import Button from '../../components/Button/Button';
import QuantityButtons from '../../components/QuatityButtons/QuantityButtons';
import styles from './CartPage.module.css';
import { API_URL } from '../../api';
import SaleForma from '../../pages/Home/SaleForma';
import axios from 'axios';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.items);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalQuantity = cartProducts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartProducts.reduce((total, item) => total + (item.discont_price || item.price) * item.quantity, 0);

  const handleImageClick = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
        discont_price: item.discont_price,
        quantity: 1,
      })
    );
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItem({ id }));
    }
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:3333/order/send`, {
        name,
        phone,
        email,
        products: cartProducts,
      });
      alert('Order successfully placed!');

      dispatch(clearCart());
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      console.error('There was an error placing the order!', error);
      setError('There was an error placing the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.link}>
        <h2>Shopping Cart</h2>
        <Link to="/products">Back to the store</Link>
      </div>
      <div className={styles.cart}>
        {cartProducts.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Looks like you have no items in your basket currently.</p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.cartBoxPage}>
            <ul className={styles.cartList}>
              {cartProducts.map((item) => {
                const imageUrl = item.image ? `${API_URL}${item.image}` : '/product_img/default_image.jpeg';
                const realPrice = item.discont_price || item.price;
                const oldPrice = item.discont_price ? item.price : null;
                return (
                  <li key={item.id} className={styles.cartProducts}>
                    <div className={styles.productImage}>
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className={styles.productImage}
                        onClick={() => handleImageClick(item)}
                      />
                    </div>
                    <div className={styles.priceCard}>
                      <div className={styles.pCart}>
                        <p>{item.title}</p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className={styles.removeButton}
                        >
                          x
                        </button>
                      </div>
                      <div className={styles.priceBox} />
                      <QuantityButtons
                        quantity={item.quantity}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                      />
                      <h2>$ {realPrice.toFixed(2)}</h2>
                      {oldPrice && <p>$ {oldPrice.toFixed(2)}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.cartOrdersForm}>
              <h3>Order details</h3>
              <p>{totalQuantity} items</p>
              <p>Total ${totalPrice.toFixed(2)}</p>
              {error && <p className={styles.error}>{error}</p>}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Button onClick={handlePlaceOrder}>Place Order</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

---------------------------------------------------
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { openModal } from "../../redux/modalSlice";
import { removeItem } from "../../redux/cartSlice";
import Order from './Order'
import Button from "../../components/Button/Button";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state) =>
    state.product.product ? state.product.product : {}
  );
  const categories = useSelector((state) => state.product.categories);
  const isLoading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, productId, categories.length]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        discont_price: product.discont_price,
        quantity,
      })
    );
  };


  let discont;
  const priceExists = typeof product.price !== 'undefined';
  const discontPriceExists = typeof product.discont_price !== 'undefined';

  if (priceExists && discontPriceExists) {
    discont = Math.round(((product.price - product.discont_price) / product.price) * 100);
  }

  console.log("Discont:", discont);

  const API_URL = `http://localhost:3333`;
  const imageUrl = product.image ? `${API_URL}${product.image}` : '/product_img/default_image.jpeg';
  const realPrice = product.discont_price || product.price;
  const oldPrice = product.discont_price ? product.price : null;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.discontPrice || item.price) * item.quantity,
    0
  );

  function handlePlaceOrder() {
    dispatch(
      openModal({
        title: "Order Placed",
        content: (
          <>
            <p>Your order has been placed successfully.</p>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </>
        ),
      })
    );
  }
  return (
    <div className={styles.cartPage}>
      <h2>Shopping Cart</h2>
      <Link to="/products">Back to the store</Link>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>

        </div>
      ) : (
        <div className={styles.cartBoxPage}>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <p>ID: {item.id}</p>
                  <p>Title: {item.title}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  {item.discont_price && (
                    <p>Discounted Price: ${item.discont_price.toFixed(2)}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to remove this item?")) {
                      dispatch(removeItem({ id: item.id }));
                    }
                  }}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.cartOrdersForm}>
            <h3>Order details</h3>
            <div className={styles.cartSummary}>
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>

            </div>
            <Order />
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </div>
        </div>
      )}
    </div>
  );
}
  -----------------------------------------
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { openModal } from "../../redux/modalSlice";
import { removeItem, addToCart } from "../../redux/cartSlice";
import { fetchProductById } from "../../redux/productSlice";
import Order from './Order';
import QuantityButtons from "../../components/QuatityButtons/QuantityButtons";
import Button from "../../components/Button/Button";
import styles from "./CartPage.module.css";

const selectCartProducts = (state) => state.cart.products;

const selectProduct = (state) => state.product.product || {};

const selectIsLoading = (state) => state.product.isLoading;

export default function CartPage() {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = useSelector(selectProduct);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleIncrement = () => setQuantity(quantity + 1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        discont_price: product.discont_price,
        quantity,
      })
    );
  };
  const handleImageClick = () => {
    handleAddToCart();
  };
  let discont = 0;
  const priceExists = typeof product.price !== 'undefined';
  const discontPriceExists = typeof product.discont_price !== 'undefined';

  if (priceExists && discontPriceExists) {
    discont = Math.round(((product.price - product.discont_price) / product.price) * 100);
  }

  const API_URL = `http://localhost:3333`;

  const totalQuantity = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.discont_price || product.price) * product.quantity,
    0
  );

  function handlePlaceOrder() {
    dispatch(
      openModal({
        title: "Order Placed",
        content: (
          <>
            <p>Your order has been placed successfully.</p>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </>
        ),
      })
    );
  }

  return (
    <div className={styles.cartPage}>
      <h2>Shopping Cart</h2>
      <Link to="/products">Back to the store</Link>
      {cartProducts.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartBoxPage}>
          <ul className={styles.cartList}>
            {cartProducts.map((item) => {
              const imageUrl = product.image ? `${API_URL}${product.image}` : '/product_img/default_image.jpeg';
              return (
                <li key={product.id} className={styles.cartProducts}>
                  <div className={styles.productImage}>
                    <img src={imageUrl} alt={product.title} className={styles.productImage} onClick={handleImageClick}/>
                    </div>
        <div className={styles.priceCard}>
                    <p>Title: {product.title}</p>
                    <QuantityButtons quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                    {product.discont_price && (
                      <p>Discounted Price: ${product.discont_price.toFixed(2)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to remove this item?")) {
                        dispatch(removeItem({ id: item.id }));
                      }
                    }}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.cartOrdersForm}>
            <h3>Order details</h3>
            <div className={styles.cartSummary}>
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <Order />
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </div>
        </div>
  )
}
    </div >
  );
}
--------------------------------------------------------
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, addToCart } from '../../redux/cartSlice';
import Button from '../../components/Button/Button';
import Order from './Order';
import QuantityButtons from '../../components/QuatityButtons/QuantityButtons';
import styles from './CartPage.module.css';
import { API_URL } from '../../api';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.items);
  const totalQuantity = cartProducts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartProducts.reduce((total, item) => total + (item.discont_price || item.price) * item.quantity, 0);

  const handleImageClick = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
        discont_price: item.discont_price,
        quantity: 1,
      })
    );
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItem({ id }));
    }
  };

  return (
    <div className={styles.cartPage}>
      <h2>Shopping Cart</h2>
      <Link to="/products">Back to the store</Link>
      {cartProducts.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartBoxPage}>
          <ul className={styles.cartList}>
            {cartProducts.map((item) => {
              const imageUrl = item.product ? `${API_URL}${item.image}` : '/product_img/default_image.jpeg';
              return (
                <li key={item.id} className={styles.cartProducts}>
                  <div className={styles.productImage}>
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className={styles.productImage}
                      onClick={() => handleImageClick(item)}
                    />
                  </div>
                  <div className={styles.priceCard}>
                    <p>Title: {item.title}</p>
                    <QuantityButtons quantity={item.quantity} onIncrement={() => handleIncrement(item.id)} onDecrement={() => handleDecrement(item.id)} />
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    {item.discont_price && (
                      <p>Discounted Price: ${item.discont_price.toFixed(2)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.cartOrdersForm}>
            <h3>Order details</h3>
            <div className={styles.cartSummary}>
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <Order />
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
--------------------------------
 <Button onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? 'Placing order...' : 'Place Order'}
                </Button>
---------------------------------
*/
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearCart, addToCart, incrementQuantity, decrementQuantity } from '../../redux/cartSlice';
import Button from '../../components/Button/Button';
import QuantityButtons from '../../components/QuatityButtons/QuantityButtons';
import styles from './CartPage.module.css';
import { API_URL } from '../../api';
import axios from 'axios';
import Order from '../../pages/Cart/Order'

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.items);

  // Состояние для формы заказа
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalQuantity = cartProducts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartProducts.reduce((total, item) => total + (item.discont_price || item.price) * item.quantity, 0);

  const handleImageClick = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        image: item.image,
        title: item.title,
        price: item.price,
        discont_price: item.discont_price,
        quantity: 1,
      })
    );
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeItem({ id }));
    }
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:3333/order/send`, {
        name,
        phone,
        email,
        products: cartProducts,
      });
      alert('Order successfully placed!');

      dispatch(clearCart());
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      console.error('There was an error placing the order!', error);
      setError('There was an error placing the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.link}>
        <h2>Shopping Cart</h2>
        <Link to="/products">Back to the store</Link>
      </div>
      <div className={styles.cart}>
        {cartProducts.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Looks like you have no items in your basket currently.</p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.cartBoxPage}>
            <ul className={styles.cartList}>
              {cartProducts.map((item) => {
                const imageUrl = item.image ? `${API_URL}${item.image}` : '/product_img/default_image.jpeg';
                const realPrice = item.discont_price || item.price;
                const oldPrice = item.discont_price ? item.price : null;
                return (
                  <li key={item.id} className={styles.cartProducts}>
                    <div className={styles.productImage}>
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className={styles.productImage}
                        onClick={() => handleImageClick(item)}
                      />
                    </div>
                    <div className={styles.priceCard}>
                      <p>{item.title}</p>
                      <QuantityButtons
                        quantity={item.quantity}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                      />
                      <div className={styles.priceDetails}>
                        <h2>$ {realPrice.toFixed(2)}</h2>
                        {oldPrice && <p className={styles.oldPrice}>$ {oldPrice.toFixed(2)}</p>}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className={styles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.cartOrdersForm}>
              <h3>Order details</h3>
              <div className={styles.cartSummary}>
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
              </div>
              <Order />
              <Button onClick={handlePlaceOrder}>Place Order</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
