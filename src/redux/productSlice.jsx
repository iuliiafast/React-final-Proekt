/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api";
import { createSelector } from 'reselect';

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data[0];
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await api.get(`/categories/all`);
    return response.data;
  }
);

const initialState = {
  product: null,
  categories: [],
  items: [],
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.isLoading = false;
      state.error = null;
    },
    addToCart: (state, action) => {
      const { id, title, image, price, discont_price, quantity } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (quantity) {
          existingItem.quantity = existingItem.quantity + quantity;
        } else {
          existingItem.quantity++;
        }
      } else {
        state.items.push({
          id,
          quantity: quantity ? quantity : 1,
          title,
          image,
          price,
          discont_price,
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
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
      });
  },
});

export const { clearProduct, addToCart } = productSlice.actions;


const selectProduct = (state) => state.product.product;
const selectCategories = (state) => state.product.categories;
const selectIsLoading = (state) => state.product.isLoading;

// Memoized selectors using reselect
export const getProduct = createSelector(
  [selectProduct],
  (product) => product
);

export const getCategories = createSelector(
  [selectCategories],
  (categories) => categories
);

export const getIsLoading = createSelector(
  [selectIsLoading],
  (isLoading) => isLoading
);

export default productSlice.reducer;
*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api";
import { createSelector } from 'reselect';

// Thunks для получения данных
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data[0];
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await api.get(`/categories/all`);
    return response.data;
  }
);

// Начальное состояние
const initialState = {
  product: null,
  categories: [],
  items: [],
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.isLoading = false;
      state.error = null;
    },
    addToCart: (state, action) => {
      const { id, title, image, price, discont_price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (quantity) {
          existingItem.quantity = existingItem.quantity + quantity;
        } else {
          existingItem.quantity++;
        }
      } else {
        state.items.push({
          id,
          quantity: quantity ? quantity : 1,
          title,
          image,
          price,
          discont_price,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
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
      });
  },
});

export const { clearProduct, addToCart } = productSlice.actions;

export const selectProduct = (state) => state.product.product;
export const selectCategories = (state) => state.product.categories;
export const selectIsLoading = (state) => state.product.isLoading;

export const getProduct = createSelector(
  [selectProduct],
  (product) => product
);

export const getCategories = createSelector(
  [selectCategories],
  (categories) => categories
);

export const getIsLoading = createSelector(
  [selectIsLoading],
  (isLoading) => isLoading
);

export const getDiscount = createSelector(
  [selectProduct],
  (product) => {
    if (product && product.price && product.discont_price) {
      if (product.price > product.discont_price) {
        return Math.round(((product.price - product.discont_price) / product.price) * 100);
      } else if (product.price === product.discont_price) {
        return 0;
      }
    }
    return null;
  }
);

export default productSlice.reducer;
