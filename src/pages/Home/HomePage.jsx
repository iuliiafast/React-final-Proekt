import ImgTwo from "../../assets/hometwo.svg";
import styles from "./HomePage.module.css";
import SaleForma from './SaleForma'
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from '../../redux/productSlice';
import TitleWithLine from '../../components/TitieWithLine/TitleWithLine'

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const selectedCategories = categories.slice(0, 4);

  return (
    <div className={styles.gridHomeCategorCard}>
      {selectedCategories.length > 0 ? (
        <ul className={styles.ulCategories}>
          {selectedCategories.map((category) => (
            <li key={category.id} className={styles.liCategories}>
              <Link to={`/categories/${category.id}`}>
                <img
                  src={`http://localhost:3333/${category.image}`}
                  alt={category.title}
                  className={styles.imgCard}
                />
                <p>{category.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Категории не найдены.</p>
      )}
    </div>
  );
};

const shuffleArray = (array) => {
  if (!array) return []
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};


const SaleList = () => {
  const [searchParams] = useSearchParams();
  const products = useSelector((state) => state.data.products);


  const filteredProducts = products?.filter((product) => {
    if (!product.discont_price) {
      return false;
    }

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (minPrice && product.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice && product.price > Number(maxPrice)) {
      return false;
    }
    return true;
  });

  const shuffledProducts = shuffleArray(filteredProducts);
  const selectedProducts = shuffledProducts.slice(0, 4);


  return (
    <div className={styles.ProductContainer}>
      {selectedProducts.map((product) => {
        const realPrice = product.discont_price || product.price;
        const oldPrice = product.discont_price ? product.price : null;
        const discont = oldPrice ? Math.round((1 - realPrice / oldPrice) * 100) : null;
        const API_URL = `http://localhost:3333`;
        const imageUrl = product.image ? `${API_URL}${product.image}` : '/product_img/default_image.jpeg';

        return (
          <Link
            to={`/products/${product.id}`}
            key={product.id}>

            <div className={styles.saleCard}>
              <div className={styles.ProductTop}>
                <img
                  src={imageUrl}
                  alt={product.title}
                />
              </div>
              <div className={styles.textCard}>
                <p>{product.title}</p>
                <div className={styles.priceBox}>
                  <h2>${realPrice}</h2>
                  {oldPrice && <p>${oldPrice}</p>}
                  {discont && (
                    <div className={styles.saleBadge}>
                      -{discont}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};


export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.promoAction}>
        <div className={styles.background}></div>
        <div className={styles.overlayContent}>
          <h1 className={styles.mirroredText}>Amazing Discounts</h1>
          <h1>on Pets Products!</h1>
          <Link to="/discounted-products" className={styles.linkBtn}>
            Check out
          </Link>
        </div>
      </section>
      <section className={styles.listCategor}>
        <TitleWithLine
          title="Categories"
          linkText="All categories"
          linkTo="/categories"
        />
        <CategoriesList />
      </section>
      <section className={styles.homeSale}>
        <h2>5% off on the first order</h2>
        <div className={styles.saleBox}>
          <div className={styles.imgTwo}>
            <img src={ImgTwo} alt="ImgTwo" className={styles.imgTwo} />
          </div>
          <div className={styles.saleForm}>
            <SaleForma />
          </div>
        </div>
      </section>
      <section className={styles.sale}>
        <TitleWithLine
          title="Sale"
          linkText="All sales"
          linkTo="/discounted-products"
        />
        <SaleList />
      </section >
    </div >
  );
}
