import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modalSlice";
import { cartSlice } from "./cartSlice";
import { dataSlice } from "./dataSlice";
import { productSlice } from "./productSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    data: dataSlice.reducer,
    product: productSlice.reducer
  },
  devTools: true,
});

export default store;
