import { createAction } from '@reduxjs/toolkit';

const getProduct = createAction<any>('product/request');
const getProductSuccess = createAction<any>('product/success');
const getProductError = createAction('product/error');

const getAllProduct = createAction<any>('allProduct/request');
const getAllProductSuccess = createAction<any>('addProduct/success');
const getAllProductError = createAction('addProduct/error');

export { getProduct, getProductSuccess, getProductError, getAllProduct, getAllProductSuccess, getAllProductError };