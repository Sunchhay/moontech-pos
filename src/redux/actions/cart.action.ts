import { createAction } from '@reduxjs/toolkit';

const getCart = createAction('cart/request');
const getCartSuccess = createAction<any>('cart/success');
const getCartError = createAction('cart/error');

export { getCart, getCartSuccess, getCartError };