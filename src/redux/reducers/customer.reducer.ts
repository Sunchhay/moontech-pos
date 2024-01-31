import { createReducer } from '@reduxjs/toolkit';
import { getCustomer, getCustomerError, getCustomerSuccess } from '../actions/customer.action';

const initialState = {
  loading: false,
  data: [],
  paginate: {
    totalItems: 10,
    totalPages: 1,
    currentPage: 1
  }
};

const CustomerReducer = createReducer(initialState, builder => {
  builder
    .addCase(getCustomer, state => {
      state.loading = true;
    })
    .addCase(getCustomerSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getCustomerError, (state, action) => {
      state.loading = false;
    });
});

export { CustomerReducer };
