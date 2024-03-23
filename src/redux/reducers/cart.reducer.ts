import { createReducer } from '@reduxjs/toolkit';
import { getCart, getCartError, getCartSuccess } from '../actions/cart.action';

const initialState = {
  loading: false,
  data: [],
};

const CartReducer = createReducer(initialState, builder => {
  builder
    .addCase(getCart, state => {
      state.loading = true;
    })
    .addCase(getCartSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(getCartError, (state, action) => {
      state.loading = false;
    });
});

export { CartReducer };
