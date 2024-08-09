/*import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "../../redux/cartSlice";
import { fetchProductById, fetchCategories } from "../../redux/productSlice";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import QuantityButtons from "../../components/QuatityButtons/QuantityButtons";
import Button from "../../components/Button/Button";
import Img13 from "../../assets/img13.svg";
import Img14 from "../../assets/img14.svg";
import Img15 from "../../assets/img15.svg";

import styles from "./ProductDetailsPage.module.css";

function getCategoryName(categories, categoryId) {
  const category = categories.find((category) => category.id === categoryId);
  return category ? category.title : "";
}

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
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

  useEffect(() => {
    console.log("Product:", product);
  }, [product]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!product) {
    return (
      <div>
        <h2>Ошибка</h2>
        <p>Продукт не найден</p>
      </div>
    );
  }

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
        description: product.description,
        quantity,
      })
    );
  };

  const breadcrumbs = [
    {
      to: "/",
      label: "Главная страница",
      isActive: false,
    },
    {
      to: "/categories",
      label: "Категории",
      isActive: false,
    },
    {
      to: `/categories/${product.categoryId}`,
      label: getCategoryName(categories, product.categoryId),
      isActive: false,
    },
    {
      to: `/products/${productId}`,
      label: product.title,
      isActive: true,
    },
  ];

  let discount = null;
  const priceExists = typeof product.price !== 'undefined';
  const discontPriceExists = typeof product.discont_price !== 'undefined';

  if (priceExists && discontPriceExists && product.price !== product.discont_price) {
    discount = Math.round(((product.price - product.discont_price) / product.price) * 100);
  }

  const API_URL = `http://localhost:3333`;
  const imageUrl = product.image ? `${API_URL}${product.image}` : '/product_img/default_image.jpeg';
  const realPrice = product.discont_price || product.price;
  const oldPrice = product.discont_price ? product.price : null;

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.productFlex}>
        <div className={styles.galerejaImgCard}>
          <img src={Img13} alt="Galer" className={styles.galer} />
          <img src={Img14} alt="Galer" className={styles.galer} />
          <img src={Img15} alt="Galer" className={styles.galer} />
        </div>
        <div className={styles.productImageContainer}>
          <img
            src={imageUrl}
            alt={product.title}
            className={styles.productImage}
          />
        </div>
        <div className={styles.descriptionCard}>
          <h2>{product.title}</h2>
          <div className={styles.priceCard}>
            <p>$ {realPrice}</p>
            {oldPrice && <p>OLD PRICE: {oldPrice}</p>}
            {discount !== null && (
              <div className={styles.saleBadge}>
                {discount}% OFF
              </div>
            )}
          </div>
          <div className={styles.btnCardBox}>
            <QuantityButtons quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
            <Button onClick={handleAddToCart} className={styles.btnCard}>Добавить в корзину</Button>
          </div>
          <div className={styles.scrolbox}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <button>Read more</button>
        </div>
      </div>
    </>
  );
}
*/

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "../../redux/cartSlice";
import { fetchProductById, fetchCategories, getProduct, getCategories, getIsLoading, getDiscount } from "../../redux/productSlice";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import QuantityButtons from "../../components/QuatityButtons/QuantityButtons";
import Button from "../../components/Button/Button";
import Img13 from "../../assets/img13.svg";
import Img14 from "../../assets/img14.svg";
import Img15 from "../../assets/img15.svg";

import styles from "./ProductDetailsPage.module.css";

function getCategoryName(categories, categoryId) {
  const category = categories.find((category) => category.id === categoryId);
  return category ? category.title : "";
}

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = useSelector(getProduct);
  const categories = useSelector(getCategories);
  const isLoading = useSelector(getIsLoading);
  const discount = useSelector(getDiscount);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, productId, categories.length]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!product) {
    return (
      <div>
        <h2>Ошибка</h2>
        <p>Продукт не найден</p>
      </div>
    );
  }

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

  const breadcrumbs = [
    {
      to: "/",
      label: "Главная страница",
      isActive: false,
    },
    {
      to: "/categories",
      label: "Категории",
      isActive: false,
    },
    {
      to: `/categories/${product.categoryId}`,
      label: getCategoryName(categories, product.categoryId),
      isActive: false,
    },
    {
      to: `/products/${productId}`,
      label: product.title,
      isActive: true,
    },
  ];

  const API_URL = `http://localhost:3333`;
  const imageUrl = product.image ? `${API_URL}${product.image}` : '/product_img/default_image.jpeg';
  const realPrice = product.discont_price || product.price;
  const oldPrice = product.discont_price ? product.price : null;

  return (
    <div className={styles.productDetailsPage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.productFlex}>
        <div className={styles.imgProduct}>
          <div className={styles.galerejaImgCard}>
            <div className={styles.img13}> <img src={Img13} alt="Galer" className={styles.galer} /> </div>
            <div className={styles.img14}> <img src={Img14} alt="Galer" className={styles.galer} /> </div>
            <div className={styles.img15}><img src={Img15} alt="Galer" className={styles.galer} /></div>
          </div>
          <div className={styles.productImageContainer}>
            <img
              src={imageUrl}
              alt={product.title}
              className={styles.productImage}
            />
          </div>
        </div>
        <div className={styles.descriptionCard}>
          <h2>{product.title}</h2>
          <div className={styles.priceCard}>
            <h2>$ {realPrice}</h2>
            {oldPrice && <p>$ {oldPrice}</p>}
            {discount !== null && discount > 0 && (
              <div className={styles.saleBadge}>
                -{discount}%
              </div>
            )}
          </div>
          <div className={styles.btnCardBox}>
            <div className={styles.btnCounter}>
              <QuantityButtons quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
            </div>
            <div className={styles.btnCart}>
              <Button onClick={handleAddToCart} className={styles.btnCard}>Добавить в корзину</Button>
            </div>
          </div>
          <div className={styles.scrolbox}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <button className={styles.btnInfo}>Read more</button>
        </div>
      </div>
    </div>
  );
}
