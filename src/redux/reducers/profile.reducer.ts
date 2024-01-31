import { createReducer } from '@reduxjs/toolkit';
import { getProfile, getProfileError, getProfileSuccess } from '../actions/profile.action';

const initialState = {
  loading: false,
  data: {},
};

const ProfileReducer = createReducer(initialState, builder => {
  builder
    .addCase(getProfile, state => {
      state.loading = true;
    })
    .addCase(getProfileSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(getProfileError, (state, action) => {
      state.loading = false;
    });
});

export { ProfileReducer };
