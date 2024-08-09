/*import { useDispatch } from "react-redux";
import {
  removeItem,
  addToCart,
  decrementFromCart,
} from "../../redux/cartSlice";
import QuantityButtons from "../QuantityButtons/QuantityButtons";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        discont_price: product.discont_price,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(
      decrementFromCart({
        id: product.id,
      })
    );
  };

  return (
    <li>
      <p>
        ID: {item.id}, title: {item.title}
      </p>
      <QuantityButtons
        quantity={item.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      {item.discont_price && (
        <p>Dicounted Price: {item.discont_price * item.quantity}</p>
      )}
      <button
        onClick={() => {
          dispatch(removeItem({ id: item.id }));
        }}
      >
        Remove
      </button>
    </li>
  );
}
*/
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeItem,
  addToCart,
  decrementFromCart,
} from "../../redux/cartSlice";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import { Modal } from '../../components/Modal/Modal'; // убедитесь, что путь к модальному окну правильный

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = () => {
    dispatch(
      addToCart({
        id: item.id, // заменено на item.id
        title: item.title,
        image: item.image,
        price: item.price,
        discont_price: item.discont_price,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(
      decrementFromCart({
        id: item.id, // заменено на item.id
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeItem({ id: item.id }));
    setIsModalOpen(true); // открываем модальное окно после удаления
  };

  const closeModal = () => {
    setIsModalOpen(false); // закрываем модальное окно
  };

  return (
    <li>
      <p>
        ID: {item.id}, Title: {item.title}
      </p>
      <QuantityButtons
        quantity={item.quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      {item.discont_price && (
        <p>Discounted Price: {item.discont_price * item.quantity}</p>
      )}
      <button onClick={handleRemove}>Remove</button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <p>Your order has been successfully placed on the website.</p>
          <p>A manager will contact you shortly to confirm your order.</p>
          <button onClick={closeModal}>OK</button>
        </Modal>
      )}
    </li>
  );
}
