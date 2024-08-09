/*import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumb/Breadcrumbs";
import styles from "./DiscountedProductsPage.module.css";
import Button from '../../../components/Button/Button';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

export default function DiscountedProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, type === "checkbox" ? checked : value);
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/products/all`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [searchParams]);
-------------------------------------------------------------------
  const filteredProducts = products
    .filter((product) => {
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");

      if (minPrice && product.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice && product.price > Number(maxPrice)) {
        return false;
      }
      return true;
    })

    .sort((a, b) => {
      const sortType = searchParams.get("sortType");

      switch (sortType) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "priceHighToLow":
          return b.price - a.price;
        case "priceLowToHigh":
          return a.price - b.price;
        default:
          return 0;
      }
    });
    --------------------------------------------------------------------
  const filteredProducts = products
    .filter((product) => product.discont_price)
    .filter((product) => {
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const realPrice = product.discont_price || product.price;

      return (
        (!minPrice || realPrice >= Number(minPrice)) &&
        (!maxPrice || realPrice <= Number(maxPrice))
      );
    })
    .sort((a, b) => {
      const sortType = searchParams.get("sortType");
      const getPrice = (product) => product.discont_price || product.price;

      switch (sortType) {
        case "priceLowToHigh":
          return getPrice(a) - getPrice(b);
        case "priceHighToLow":
          return getPrice(b) - getPrice(a);
        case "newest":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });
  const breadcrumbs = [
    {
      to: "/",
      label: "Main Page",
      isActive: false,
    },
    {
      to: "/discounted-products",
      label: "Discounted Products",
      isActive: true,
    },
  ];
  const API_URL = `http://localhost:3333`;
  return (
    <div className={styles.discontPage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2>Discounted items</h2>
      <div className={styles.priceundsorted}>
        <label>
          Price
          <input
            name="minPrice"
            type="number"
            value={searchParams.get("minPrice") || ""}
            onChange={handleChange} placeholder="from"
          />
          <input
            name="maxPrice"
            type="number"
            value={searchParams.get("maxPrice") || ""}
            onChange={handleChange} placeholder="to"
          />
        </label>
        <label>
          Sorted
          <select
            name="sortType"
            value={searchParams.get("sortType") || "default"}
            onChange={handleChange}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="priceHighToLow">price: high-low</option>
            <option value="priceLowToHigh">price: low-high</option>
          </select>
        </label>
      </div>
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => {
          const realPrice = product.discont_price || product.price;
          const oldPrice = product.discont_price ? product.price : null;
          const discont = oldPrice ? Math.round((1 - realPrice / oldPrice) * 100) : null;
          const imageUrl = product.image ? `${API_URL}${product.image}` : `/product_img/default_image.jpeg`;
          return (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
            >
              <div className={styles.saleImg}>
                <img
                  src={imageUrl}
                  alt={product.title}
                  className={styles.productImage}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Adding to cart:", product);
                    dispatch(addToCart({
                      id: product.id,
                      title: product.title,
                      image: product.image,
                      price: product.price,
                      discount_price: product.discont_price,
                    }));
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </Link>
              </div>
      <p> {product.title}</p>
      <h2>$ {realPrice}</h2>
      <div className={styles.productLink}>
        {oldPrice && <p>OLD PRICE: {oldPrice}</p>}
        {discont !== null && (
          <div className={styles.saleBadge}>
            {discont}% OFF
          </div>)}

        );
        })}
      </div>
    </div>
  );
}
  -------------------------------------------
  */
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumb/Breadcrumbs";
import styles from "./DiscountedProductsPage.module.css";
import Button from '../../../components/Button/Button';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

export default function DiscountedProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, type === "checkbox" ? checked : value);
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/products/all`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const filteredProducts = products
    .filter((product) => product.discont_price)
    .filter((product) => {
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const realPrice = product.discont_price || product.price;

      return (
        (!minPrice || realPrice >= Number(minPrice)) &&
        (!maxPrice || realPrice <= Number(maxPrice))
      );
    })
    .sort((a, b) => {
      const sortType = searchParams.get("sortType");
      const getPrice = (product) => product.discont_price || product.price;

      switch (sortType) {
        case "priceLowToHigh":
          return getPrice(a) - getPrice(b);
        case "priceHighToLow":
          return getPrice(b) - getPrice(a);
        case "newest":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

  const breadcrumbs = [
    {
      to: "/",
      label: "Main Page",
      isActive: false,
    },
    {
      to: "/discounted-products",
      label: "Discounted Products",
      isActive: true,
    },
  ];

  const API_URL = `http://localhost:3333`;

  return (
    <div className={styles.discontPage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2>Discounted items</h2>
      <div className={styles.priceundsorted}>
        <label>
          Price
          <input
            name="minPrice"
            type="number"
            value={searchParams.get("minPrice") || ""}
            onChange={handleChange}
            placeholder="from"
          />
          <input
            name="maxPrice"
            type="number"
            value={searchParams.get("maxPrice") || ""}
            onChange={handleChange}
            placeholder="to"
          />
        </label>
        <label>
          Sorted
          <select
            name="sortType"
            value={searchParams.get("sortType") || "default"}
            onChange={handleChange}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="priceHighToLow">price: high-low</option>
            <option value="priceLowToHigh">price: low-high</option>
          </select>
        </label>
      </div>
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => {
          const realPrice = product.discont_price || product.price;
          const oldPrice = product.discont_price ? product.price : null;
          const discont = oldPrice ? Math.round((1 - realPrice / oldPrice) * 100) : null;
          const imageUrl = product.image ? `${API_URL}${product.image}` : `/product_img/default_image.jpeg`;

          return (
            <div className={styles.productCard} key={product.id}>
              <Link to={`/products/${product.id}`} className={styles.productLink}>
                <div className={styles.imageContainer}>
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Adding to cart:", product);
                      dispatch(addToCart({
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        discount_price: product.discont_price,
                      }));
                    }}
                    className={styles.addToCartButton}
                  >
                    Add to cart
                  </Button>
                </div>
              </Link>
              <div className={styles.productDetails}>
                <p>{product.title}</p>
                <h2>$ {realPrice}</h2>
                {oldPrice && <p className={styles.oldPrice}>OLD PRICE: ${oldPrice}</p>}
                {discont !== null && (
                  <div className={styles.saleBadge}>
                    {discont}% OFF
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
