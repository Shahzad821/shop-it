import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingInfo: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (itemExists) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === itemExists.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },

    removeCartItem: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== itemId
      );
    },

    updateCartItemQuantity: (state, action) => {
      const { product, newQuantity } = action.payload;

      const updatedItem = state.cartItems.find((i) => i.product === product);

      if (updatedItem) {
        updatedItem.quantity = newQuantity;
      }
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  saveShippingInfo,
  setCartItem,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
