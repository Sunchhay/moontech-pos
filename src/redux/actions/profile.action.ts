import { createAction } from '@reduxjs/toolkit';

const getProfile = createAction<any>('profile/request');
const getProfileSuccess = createAction<any>('profile/success');
const getProfileError = createAction<any>('profile/error');

export { getProfile, getProfileSuccess, getProfileError };