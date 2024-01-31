import { createAction } from '@reduxjs/toolkit';

const getProduct = createAction<any>('product/request');
const getProductSuccess = createAction<any>('product/success');
const getProductError = createAction<any>('product/error');

export { getProduct, getProductSuccess, getProductError };