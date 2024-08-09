import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchCategories, fetchProducts } from "../../redux/dataSlice";

export default function DataLoader() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Загрузи данные с сервера при первом рендере
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Обнови данные с сервера каждые 5 минут
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchProducts());
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Обнови данные с сервера при изменении URL
  // useEffect(() => {
  //   console.log("Location changed:", location.pathname);
  //   dispatch(fetchProducts());
  // }, [location, dispatch]);

  return null;
}