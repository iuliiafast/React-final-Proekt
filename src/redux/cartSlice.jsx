/*import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
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
    decrementFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  decrementFromCart,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
*/
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, image, price, discont_price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        state.items.push({
          id,
          quantity: quantity || 1,
          title,
          image,
          price,
          discont_price,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
