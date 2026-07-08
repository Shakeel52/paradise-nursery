// src/features/cart/CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalItems += 1;
      state.totalAmount += action.payload.price;
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += item.price;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalAmount -= item.price;
        if (item.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.totalItems -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
