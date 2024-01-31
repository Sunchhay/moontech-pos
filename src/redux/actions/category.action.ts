import { createAction } from '@reduxjs/toolkit';

const getCategory = createAction<any>('category/request');
const getCategorySuccess = createAction<any>('category/success');
const getCategoryError = createAction('category/error');

const getAllCategory = createAction('allCategory/request');
const getAllCategorySuccess = createAction<any>('allCategory/success');
const getAllCategoryError = createAction('allCategory/error');

export {
    getCategory,
    getCategorySuccess,
    getCategoryError,
    getAllCategory,
    getAllCategorySuccess,
    getAllCategoryError,
};