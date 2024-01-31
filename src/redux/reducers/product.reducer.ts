import { createReducer } from '@reduxjs/toolkit';
import { getProduct, getProductError, getProductSuccess } from '../actions/product.action';

const initialState = {
  loading: false,
  data: [],
  paginate: {
    totalItems: 10,
    totalPages: 1,
    currentPage: 1
  }
};

const ProductReducer = createReducer(initialState, builder => {
  builder
    .addCase(getProduct, state => {
      state.loading = true;
    })
    .addCase(getProductSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getProductError, (state, action) => {
      state.loading = false;
    });
});

export { ProductReducer };
