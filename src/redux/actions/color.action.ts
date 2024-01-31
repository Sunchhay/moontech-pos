import { createAction } from '@reduxjs/toolkit';

const getColor = createAction<any>('color/request');
const getColorSuccess = createAction<any>('color/success');
const getColorError = createAction('color/error');

const getAllColor = createAction('allColor/request');
const getAllColorSuccess = createAction<any>('allColor/success');
const getAllColorError = createAction('allColor/error');

export {
    getColor,
    getColorSuccess,
    getColorError,
    getAllColor,
    getAllColorSuccess,
    getAllColorError
};