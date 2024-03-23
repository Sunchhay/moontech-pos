import { createReducer } from '@reduxjs/toolkit';
import { getAllCategory, getAllCategoryError, getAllCategorySuccess, getCategory, getCategoryError, getCategorySuccess } from '../actions/category.action';

const initialState = {
  loading: false,
  data: [],
  paginate: {
    totalItems: 10,
    totalPages: 1,
    currentPage: 1
  }
};

const CategoryReducer = createReducer(initialState, builder => {
  builder
    .addCase(getCategory, state => {
      state.loading = true;
    })
    .addCase(getCategorySuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getCategoryError, (state, action) => {
      state.loading = false;
    });
});

const allState = {
  loading: false,
  data: [],
  count: 0
};

const AllCategoryReducer = createReducer(allState, builder => {
  builder
    .addCase(getAllCategory, state => {
      state.loading = true;
    })
    .addCase(getAllCategorySuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
    })
    .addCase(getAllCategoryError, (state, action) => {
      state.loading = false;
    });
});

export { CategoryReducer, AllCategoryReducer };
