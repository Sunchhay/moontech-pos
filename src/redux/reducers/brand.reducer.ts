import { createReducer } from '@reduxjs/toolkit';
import { getAllBrand, getAllBrandError, getAllBrandSuccess, getBrand, getBrandError, getBrandSuccess } from '../actions/brand.action';

const initialState = {
  loading: false,
  data: [],
  paginate: {
    totalItems: 10,
    totalPages: 1,
    currentPage: 1
  }
};

const allBrandState = {
  loading: false,
  data: [],
};

const BrandReducer = createReducer(initialState, builder => {
  builder
    .addCase(getBrand, state => {
      state.loading = true;
    })
    .addCase(getBrandSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getBrandError, (state, action) => {
      state.loading = false;
    });
});


const AllBrandReducer = createReducer(allBrandState, builder => {
  builder
    .addCase(getAllBrand, state => {
      state.loading = true;
    })
    .addCase(getAllBrandSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(getAllBrandError, (state, action) => {
      state.loading = false;
    });
});

export { BrandReducer, AllBrandReducer };
