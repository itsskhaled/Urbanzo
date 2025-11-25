import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );
      if (exist) {
        exist.quantity += item.quantity;
        exist.totalPrice = exist.quantity * exist.price;
      } else {
        state.cartItems.push({
          ...item,
          totalPrice: item.price * item.quantity,
        });
      }

      state.totalQuantity = state.cartItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (acc, i) => acc + i.totalPrice,
        0
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      );

      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;

      const item = state.cartItems.find(
        (i) => i.id === id && i.selectedSize === selectedSize
      );

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.price;
      }

      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;

      const item = state.cartItems.find(
        (i) => i.id === id && i.selectedSize === selectedSize
      );

      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
      }

      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      state.totalAmount = state.cartItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    loadCartFromStorage: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
