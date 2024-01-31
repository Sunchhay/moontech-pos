import { createAction } from '@reduxjs/toolkit';

const getBrand = createAction<any>('brand/request');
const getBrandSuccess = createAction<any>('brand/success');
const getBrandError = createAction('brand/error');

const getAllBrand = createAction('allBrand/request');
const getAllBrandSuccess = createAction<any>('allBrand/success');
const getAllBrandError = createAction('allBrand/error');

export {
    getBrand,
    getBrandSuccess,
    getBrandError,
    getAllBrand,
    getAllBrandSuccess,
    getAllBrandError,
};