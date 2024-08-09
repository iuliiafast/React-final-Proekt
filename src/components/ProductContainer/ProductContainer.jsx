/*import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './ProductContainer.module.css';
import { addToCart } from "../../redux/cartSlice";
import Button from '../../components/Button/Button';
const API_URL = `http://localhost:3333`;

const ProductContainer = ({ products }) => {
  const dispatch = useDispatch();
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className={styles.productContainer}>
      {productList.length === 0 ? (
        <p>No products available.</p>
      ) : (
        productList.map((product) => {
          const [isAdded, setIsAdded] = useState(false);
          const realPrice = product.discont_price ?? product.price;
          const oldPrice = product.discont_price ? product.price : null;
          const discont = oldPrice ? Math.round((1 - realPrice / oldPrice) * 100) : null;
          const imageUrl = product.image ? `${API_URL}${product.image}` : '/path/to/default/image.jpg';

          return (
            <div className={styles.productCard} key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className={styles.productCardContent}>
                  <div className={styles.productTop}>
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className={styles.imgCard}
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(addToCart({
                          id: product.id,
                          title: product.title,
                          image: product.image,
                          price: realPrice,
                          discont_price: product.discont_price,
                        }));
                        setIsAdded(true);
                      }}
                      isActive={isAdded}
                    >
                      <span className={styles.defaultText}>
                        {isAdded ? "Added" : "Add to cart"}
                      </span>
                      {isAdded}
                    </Button>
                  </div>
                  <div className={styles.textCard}>
                    <p>{product.title}</p>
                    <div className={styles.priceBox}>
                      <h3>${realPrice.toFixed(2)}</h3>
                      {oldPrice && <p className={styles.oldPrice}>${oldPrice.toFixed(2)}</p>}
                      {discont && (
                        <div className={styles.saleBadge}>
                          -{discont}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductContainer;
*/
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './ProductContainer.module.css';

const API_URL = `http://localhost:3333`;
const ProductContainer = ({ products }) => {
  const dispatch = useDispatch();
  const [addedProducts, setAddedProducts] = useState(new Set());

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.discont_price ?? product.price,
      discont_price: product.discont_price,
    }));
    setAddedProducts(prev => new Set(prev).add(product.id));
  };

  const productList = Array.isArray(products) ? products : [];

  return (
    <div className={styles.productContainer}>
      {productList.length === 0 ? (
        <p>No products available.</p>
      ) : (
        productList.map((product) => {
          const realPrice = product.discont_price ?? product.price;
          const oldPrice = product.discont_price ? product.price : null;
          const discont = oldPrice ? Math.round((1 - realPrice / oldPrice) * 100) : null;
          const imageUrl = product.image ? `${API_URL}${product.image}` : '/path/to/default/image.jpg';
          const isAdded = addedProducts.has(product.id);

          return (
            <div className={styles.productCard} key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className={styles.productCardContent}>
                  <div className={styles.productTop}>
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className={styles.imgCard}
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      isActive={isAdded}
                    >
                      <span className={styles.defaultText}>
                        {isAdded ? "Added" : "Add to cart"}
                      </span>
                    </Button>
                  </div>
                  <div className={styles.textCard}>
                    <p>{product.title}</p>
                    <div className={styles.priceBox}>
                      <h3>${realPrice.toFixed(2)}</h3>
                      {oldPrice && <p className={styles.oldPrice}>${oldPrice.toFixed(2)}</p>}
                      {discont && (
                        <div className={styles.saleBadge}>
                          -{discont}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductContainer;
