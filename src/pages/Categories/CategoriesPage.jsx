import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumbs";
import styles from './CategoriesPage.module.css'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/categories/all`);
        console.log("Categories data:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("error");
      }
    };

    fetchCategories();
  }, []);
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className={styles.categoriesPage}>
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
          {
            to: "/categories/${category.id}",
            label: "Category",
            isActive: true,
          },
        ]}
      />
      <div className={styles.categoriesGrid}>
        <h2>Categories</h2>
        {categories.length > 0 ? (
          <ul className={styles.ulCategories}>
            {categories.map((category) => (
              <li key={category.id} className={styles.liCategories}>
                <Link to={`/categories/${category.id}`}>
                  <div className={styles.ProductTop}>
                    <img
                      src={`http://localhost:3333/${category.image}`}
                      alt={category.title}
                    />
                  </div>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Категории не найдены.</p>
        )}
      </div>
    </div>
  );
}
