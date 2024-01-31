import { createReducer } from '@reduxjs/toolkit';
import { getAllAttribute, getAllAttributeError, getAllAttributeSuccess, getAttribute, getAttributeError, getAttributeSuccess, getSubAttribute, getSubAttributeError, getSubAttributeSuccess } from '../actions/attribute.action';

const initialState = {
  loading: false,
  data: [],
  paginate: {
    totalItems: 10,
    totalPages: 1,
    currentPage: 1
  }
};

const AttributeReducer = createReducer(initialState, builder => {
  builder
    .addCase(getAttribute, state => {
      state.loading = true;
    })
    .addCase(getAttributeSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.paginate = action.payload.paginate;
    })
    .addCase(getAttributeError, (state, action) => {
      state.loading = false;
    });
});

const AllAttributeReducer = createReducer(initialState, builder => {
  builder
    .addCase(getAllAttribute, state => {
      state.loading = true;
    })
    .addCase(getAllAttributeSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(getAllAttributeError, (state, action) => {
      state.loading = false;
    });
});

const SubAttributeReducer = createReducer(initialState, builder => {
  builder
    .addCase(getSubAttribute, state => {
      state.loading = true;
    })
    .addCase(getSubAttributeSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(getSubAttributeError, (state, action) => {
      state.loading = false;
    });
});

export { AttributeReducer, AllAttributeReducer, SubAttributeReducer };
