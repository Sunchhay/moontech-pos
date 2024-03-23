import { createReducer } from '@reduxjs/toolkit';
import { getAllProduct, getAllProductError, getAllProductSuccess, getProduct, getProductError, getProductSuccess } from '../actions/product.action';

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

const allProductState = {
  loading: false,
  data: [],
};

const AllProductReducer = createReducer(allProductState, builder => {
  builder
    .addCase(getAllProduct, state => {
      state.loading = true;
    })
    .addCase(getAllProductSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(getAllProductError, (state, action) => {
      state.loading = false;
    });
});

export { AllProductReducer };
