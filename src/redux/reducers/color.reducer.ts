import { createReducer } from '@reduxjs/toolkit';
import { getAllColor, getAllColorError, getAllColorSuccess, getColor, getColorError, getColorSuccess } from '../actions/color.action';

const initialState = {
  loading: false,
  data: [],
  paginate: {
    totalItems: 10,
    totalPages: 1,
    currentPage: 1
  }
};

const ColorReducer = createReducer(initialState, builder => {
  builder
    .addCase(getColor, state => {
      state.loading = true;
    })
    .addCase(getColorSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getColorError, (state, action) => {
      state.loading = false;
    });
});

const AllColorReducer = createReducer(initialState, builder => {
  builder
    .addCase(getAllColor, state => {
      state.loading = true;
    })
    .addCase(getAllColorSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getAllColorError, (state, action) => {
      state.loading = false;
    });
});

export { ColorReducer, AllColorReducer };
