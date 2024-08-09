import ProductContainer from '../ProductContainer/ProductContainer';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FilteredProductList.module.css';

const API_URL = `http://localhost:3333`;

const FilteredProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/all`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;
  const includeDiscount = searchParams.get('includeDiscount') === 'true';

  const filteredProducts = products
    .filter(product => {
      const productPrice = product.discont_price ?? product.price;

      if (productPrice < minPrice || productPrice > maxPrice) {
        return false;
      }
      if (includeDiscount && !product.discont_price) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const sortType = searchParams.get('sortType');
      const priceA = a.discont_price ?? a.price;
      const priceB = b.discont_price ?? b.price;

      console.log(`Sorting by: ${sortType}, a: ${priceA}, b: ${priceB}`);

      switch (sortType) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'priceHighToLow':
          return priceB - priceA;
        case 'priceLowToHigh':
          return priceA - priceB;
        default:
          return 0;
      }
    });

  console.log('Search Params:', searchParams.toString());
  console.log('Products:', products);
  console.log('Filtered Products:', filteredProducts);

  return (
    <div className={styles.filteredProductList}>
      <div className={styles.filters}>
        <label>
          Min Price
          <input
            name="minPrice"
            type="number"
            value={searchParams.get('minPrice') || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Max Price
          <input
            name="maxPrice"
            type="number"
            value={searchParams.get('maxPrice') || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Discounted items
          <input
            name="includeDiscount"
            type="checkbox"
            onChange={handleChange}
            checked={searchParams.get('includeDiscount') === 'true'}
          />
        </label>
        <label>
          Sorted
          <select
            name="sortType"
            value={searchParams.get('sortType') || 'default'}
            onChange={handleChange}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="priceHighToLow">price: high-low</option>
            <option value="priceLowToHigh">price: low-high</option>
          </select>
        </label>
      </div>
      <ProductContainer products={filteredProducts} />
    </div>
  );
};

export default FilteredProductList;



