import { createSlice } from "@reduxjs/toolkit";

const initialApiState = { products: [] };

const apiSlice = createSlice({
  name: "product-api",
  initialState: initialApiState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { getProducts } = apiSlice.actions;
export default apiSlice.reducer;
