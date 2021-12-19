import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  favorites: [],
  basket: [],
  basketCount: 0,
  basketTotal: 0,
};

const productSlice = createSlice({
  name: "product-slice",
  initialState: initialProductState,
  reducers: {
    basketTotal(state, action) {
      state.basketTotal = action.payload;
    },
    favoritesUpdate(state, action) {
      state.favorites = action.payload;
    },
    basketCountUpdate(state, action) {
      state.basketCount = action.payload;
    },
    addToFavorite(state, action) {
      const favoriteIndex = state.favorites.findIndex(
        (item) => item.id === String(action.payload)
      );
      if (favoriteIndex === -1) {
        state.favorites.push(String(action.payload));
      }
      localStorage.setItem("favorites", state.favorites);
    },
    removeFromFavorite(state, action) {
      state.favorites = state.favorites.filter(function (favoriteIndex) {
        return favoriteIndex !== String(action.payload);
      });
      localStorage.setItem("favorites", state.favorites);
    },
    addToBasket(state, action) {
      if (localStorage.getItem("basket")) {
        state.basket = JSON.parse(localStorage.getItem("basket"));
      }
      if (state.basket.find((item) => item.id === action.payload.id)) {
        const objectIndex = state.basket.findIndex(
          (item) => item.id === action.payload.id
        );
        state.basketCount += 1;
        state.basket[objectIndex].productCount += 1;
      } else {
        state.basket.push(action.payload);
        state.basketCount += 1;
      }

      localStorage.setItem("basket", JSON.stringify(state.basket));
      localStorage.setItem("basket-count", state.basketCount);
    },
    removeFromBasket(state, action) {
      if (state.basket.find((item) => item.id === action.payload.id)) {
        const objectIndex = state.basket.findIndex(
          (item) => item.id === action.payload.id
        );

        if (state.basket[objectIndex].productCount > 0) {
          state.basketCount -= 1;
          state.basket[objectIndex].productCount -= 1;
        }

        if (state.basket[objectIndex].productCount === 0) {
          state.basket = state.basket.filter(function (objectIndex) {
            return objectIndex !== state.basket[objectIndex];
          });
        }
      }

      localStorage.setItem("basket", JSON.stringify(state.basket));
      localStorage.setItem("basket-count", state.basketCount);
    },
    basketUpdate(state, action) {
      state.basket = action.payload;
    },
  },
});

export const {
  addToFavorite,
  addToBasket,
  removeFromFavorite,
  removeFromBasket,
  basketUpdate,
  basketCountUpdate,
  favoritesUpdate,
  basketTotal,
} = productSlice.actions;
export default productSlice.reducer;
