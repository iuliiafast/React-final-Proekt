/*import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { API_URL } from "../../../api";
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumbs';
import styles from "./ProductByCategoryPage.module.css";
import { addToCart } from "../../../redux/cartSlice";
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';

export default function ProductsByCategoryPage() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    if (type === "checkbox") {
      newSearchParams.set(name, checked);
    } else {
      newSearchParams.set(name, value);
    }
    setSearchParams(newSearchParams);
  }


  useEffect(() => {
    // Fetch products by category ID
    setIsLoading(true);
    axios
      .get(`${API_URL}/categories/${categoryId}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
          setCategoryName(response.data.category.title);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("An error occurred fetching data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const filteredProducts = products
    .filter((product) => {
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const includeDiscont = searchParams.get("includeDiscont") === "true";

      if (minPrice && product.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice && product.price > Number(maxPrice)) {
        return false;
      }
      if (includeDiscont && !product.discont_price) {
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

  return (
    <div className={styles.productsByCategoryPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          breadcrumbs={[
            {
              to: "/",
              label: "Main Page",
              isActive: false,
            },
            {
              to: "/categories",
              label: "Categories",
              isActive: false,
            },
            categoryId && {
              to: `/categories/${categoryId}`,
              label: categoryName,
              isActive: true,
            },
          ].filter(Boolean)}
        />
      </div>
      <h2>{categoryName}</h2>

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
          Discounted items
          <input
            name="includeDiscont"
            type="checkbox"
            onChange={handleChange}
            checked={searchParams.get("includeDiscont") === "true"}
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

      {error && (
        <p
          style={{
            color: "red",
            backgroundColor: "pink",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {error}
        </p>
      )}
      <div className={styles.ulProductByCategoryPage}>
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
              <div className={styles.productLink}>
                {oldPrice && <p>OLD PRICE: {oldPrice}</p>}
                {discont !== null && (
                  <div className={styles.saleBadge}>
                    {discont}% OFF
                  </div>)}
                <div className={styles.productImage}>
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className={styles.productImage}
                  />
                </div>
                <p> {product.title}</p>
                <h2>$ {realPrice}</h2>

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
          );
        })}
      </div>
    </div>
  );
}
  ---------------------------------
  
import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ProductContainer from '../../../components/ProductContainer/ProductContainer';
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumbs';
import { API_URL } from '../../../api';
import styles from './ProductsByCategoryPage.module.css';

export default function ProductsByCategoryPage() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    if (type === 'checkbox') {
      newSearchParams.set(name, checked);
    } else {
      newSearchParams.set(name, value);
    }
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    // Получение продуктов по ID категории
    setIsLoading(true);
    axios
      .get(`${API_URL}/categories/${categoryId}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
          setCategoryName(response.data.category.title);
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных: ', error);
        setError('Произошла ошибка при получении данных. Пожалуйста, попробуйте позже.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const filteredProducts = products
    .filter((product) => {
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const includeDiscont = searchParams.get('includeDiscont') === 'true';

      if (minPrice && product.price < Number(minPrice)) {
        return false;
      }
      if (maxPrice && product.price > Number(maxPrice)) {
        return false;
      }
      if (includeDiscont && !product.discont_price) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const sortType = searchParams.get('sortType');

      switch (sortType) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'priceHighToLow':
          return b.price - a.price;
        case 'priceLowToHigh':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  return (
    <div className={styles.productsByCategoryPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          breadcrumbs={[
            { to: '/', label: 'Главная страница', isActive: false },
            { to: '/categories', label: 'Категории', isActive: false },
            categoryId && { to: `/categories/${categoryId}`, label: categoryName, isActive: true },
          ].filter(Boolean)}
        />
      </div>
      <h2>{categoryName}</h2>

      <div className={styles.priceundsorted}>
        <label>
          Цена
          <input
            name="minPrice"
            type="number"
            value={searchParams.get('minPrice') || ''}
            onChange={handleChange}
            placeholder="от"
          />
          <input
            name="maxPrice"
            type="number"
            value={searchParams.get('maxPrice') || ''}
            onChange={handleChange}
            placeholder="до"
          />
        </label>
        <label>
          Только со скидкой
          <input
            name="includeDiscont"
            type="checkbox"
            onChange={handleChange}
            checked={searchParams.get('includeDiscont') === 'true'}
          />
        </label>
        <label>
          Сортировка
          <select
            name="sortType"
            value={searchParams.get('sortType') || 'default'}
            onChange={handleChange}
          >
            <option value="default">по умолчанию</option>
            <option value="newest">новинки</option>
            <option value="priceHighToLow">цена: от высокой к низкой</option>
            <option value="priceLowToHigh">цена: от низкой к высокой</option>
          </select>
        </label>
      </div>

      {error && (
        <p
          style={{
            color: 'red',
            backgroundColor: 'pink',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {error}
        </p>
      )}

      <ProductContainer />
    </div>
  );
}
*/
import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumbs';
import FilteredProductList from '../../../components/FilteredProductList/FilteredProductList';
import { API_URL } from '../../../api';
import ProductContainer from '../../../components/ProductContainer/ProductContainer';
import styles from './ProductByCategoryPage.module.css';

export default function ProductsByCategoryPage() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  /*
    function handleChange(e) {
      const { name, value, type, checked } = e.target;
      const newSearchParams = new URLSearchParams(searchParams);
      if (type === 'checkbox') {
        newSearchParams.set(name, checked ? 'true' : 'false');
      } else {
        newSearchParams.set(name, value);
      }
      setSearchParams(newSearchParams);
    }
  *-------------
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);

    if (type === "checkbox") {
      newSearchParams.set(name, checked ? "true" : "false");
    } else {
      newSearchParams.set(name, value);
    }

    setSearchParams(newSearchParams);
  }
-------------*/
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, type === "checkbox" ? checked : value);
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/categories/${categoryId}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
          setCategoryName(response.data.category.title);
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных: ', error);
        setError('Произошла ошибка при получении данных. Пожалуйста, попробуйте позже.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.productsByCategoryPage}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          breadcrumbs={[
            { to: '/', label: 'Главная страница', isActive: false },
            { to: '/categories', label: 'Категории', isActive: false },
            categoryId && { to: `/categories/${categoryId}`, label: categoryName, isActive: true },
          ].filter(Boolean)}
        />
      </div>
      <h2>{categoryName}</h2>


      <FilteredProductList
        products={products}
        searchParams={searchParams}
        onSearchParamsChange={handleChange}
        error={error}
      />
      <ProductContainer />
    </div>
  );
}
