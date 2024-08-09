import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

import Logo from "../../assets/logo.svg";
import CartIcon from './CartIcon';
import styles from "./Header.module.css";


export default function Header() {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.data.isLoading);
  useEffect(() => {
    if (loadingRef.current) {
      if (isLoading) {
        loadingRef.current.continuousStart();
      } else {
        loadingRef.current.complete();
      }
    }
  }, [isLoading]);

  return (
    <header className={styles.header}>
      <LoadingBar color="#0D50FF" ref={loadingRef} />
      <Link to="/"><img src={Logo} alt="Logo" /></Link>
      <nav className={styles.nav}>
        <ul className={styles.ulHeader}>
          <li className={styles.liHeader}>
            <Link to="/">Main Page</Link>
          </li>
          <li className={styles.liHeader}>
            <Link to="/categories">Categories</Link>
          </li>
          <li className={styles.liHeader}>
            <Link to="/products">All products</Link>
          </li>
          <li className={styles.liHeader}>
            <Link to="/discounted-products">All sales</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.cart}>
        <CartIcon />
      </div>
    </header>
  );
}
