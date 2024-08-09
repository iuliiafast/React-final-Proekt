/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../api";

export const fetchCategories = createAsyncThunk(
  "data/fetchCategories",
  async () => {
    const response = await axios.get(`${API_URL}/categories/all`);
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
    const response = await axios.get(`${API_URL}/products/all`);
    return response.data;
  }
);

const initialState = {
  categories: [],
  products: [],
  isLoading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../api";

// Асинхронные запросы для получения данных
export const fetchCategories = createAsyncThunk(
  "data/fetchCategories",
  async () => {
    const response = await axios.get(`${API_URL}/categories/all`);
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async () => {
    const response = await axios.get(`${API_URL}/products/all`);
    return response.data;
  }
);

// Начальное состояние с данными
const initialState = {
  categories: [],
  products: [],
  isLoading: false,
  error: null,
};

// Создание слайса с редьюсерами и экстра-редьюсерами
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Экспорт редьюсера для использования в хранилище
export default dataSlice.reducer;

// Если нужны селекторы
export const selectCategories = (state) => state.data.categories;
export const selectProducts = (state) => state.data.products;
export const selectIsLoading = (state) => state.data.isLoading;
export const selectError = (state) => state.data.error;