/*import { useEffect, useState } from 'react';
import axios from 'axios';
import FilteredProductList from '../../../components/FilteredProductList/FilteredProductList';
import ProductContainer from "../../../components/ProductContainer/ProductContainer";
import styles from './AllProductsPage.module.css';
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumbs';

const API_URL = `http://localhost:3333`;

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className={styles.allproductscontainer}>
      <Breadcrumbs
        breadcrumbs={[
          {
            to: "/",
            label: "Main Page",
            isActive: false,
          },
          {
            to: "/products",
            label: "All Products",
            isActive: true,
          },
        ]}
      />
      <h2>All Products</h2>
      <FilteredProductList products={products} />

      <ProductContainer products={products} />
    </div>
  );
}
*/
import { useEffect, useState } from 'react';
import axios from 'axios';
import FilteredProductList from '../../../components/FilteredProductList/FilteredProductList';
import ProductContainer from "../../../components/ProductContainer/ProductContainer";
import styles from './AllProductsPage.module.css';
import Breadcrumbs from '../../../components/Breadcrumb/Breadcrumbs';

const API_URL = `http://localhost:3333`;

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className={styles.allproductscontainer}>
      <Breadcrumbs
        breadcrumbs={[
          {
            to: "/",
            label: "Main Page",
            isActive: false,
          },
          {
            to: "/products",
            label: "All Products",
            isActive: true,
          },
        ]}
      />
      <h2>All Products</h2>

      <ProductContainer products={products} />
    </div>
  );
}
