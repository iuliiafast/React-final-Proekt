import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ConnectedModal from "./components/Modal/ConnectedModal";

import HomePage from "./pages/Home/HomePage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ProductByCategoryPage from "./pages/Products/ByCategory/ProductByCategoryPage";
import AllProductsPage from "./pages/Products/All/AllProductsPage";
import DiscountedProductsPage from "./pages/Products/Discounted/DiscountedProductsPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

import store from "./redux/store";
import "./styles.css";
import { CartProvider } from "./CartContext";
import DataLoader from "./components/DataLoader/DataLoader";
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.appContainer}>
      <ReduxProvider store={store}>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route
                path="categories/:categoryId"
                element={<ProductByCategoryPage />}
              />
              <Route path="products" element={<AllProductsPage />} />
              <Route
                path="discounted-products"
                element={<DiscountedProductsPage />}
              />
              <Route path="products/:productId" element={<ProductDetailsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
            <ConnectedModal />
            <DataLoader />
          </BrowserRouter>
        </CartProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;