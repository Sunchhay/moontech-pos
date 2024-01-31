import { createReducer } from '@reduxjs/toolkit';
import { handleSideBar } from '../actions/index.action';

const sizeBarState = true;

export const SideBarReducer = createReducer(sizeBarState, builder => {
  builder.addCase(handleSideBar, (state, action) => {
    return action.payload;
  })
});

