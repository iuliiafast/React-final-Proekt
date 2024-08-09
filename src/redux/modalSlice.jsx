import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Пример того, как можно использовать createAsyncThunk для открытия и закрытия модального окна
export const openAndCloseModal = createAsyncThunk(
  "modal/openAndCloseModal",
  async (data, thunkAPI) => {
    // data - это объект, в котором наше состояние в нашем срезе (isOpen, title, content)
    const { title, content } = data;
    // thunkAPI - объект с полным доступом к Redux
    thunkAPI.dispatch(openModal({ title, content }));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    thunkAPI.dispatch(closeModal());
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    title: null,
    content: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = null;
      state.content = null;
    },
  },
});

const actions = modalSlice.actions;
export const { openModal, closeModal } = actions;
export default modalSlice.reducer;
