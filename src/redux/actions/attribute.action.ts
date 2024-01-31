import { createAction } from '@reduxjs/toolkit';

const getAttribute = createAction<any>('attribute/request');
const getAttributeSuccess = createAction<any>('attribute/success');
const getAttributeError = createAction('attribute/error');

const getAllAttribute = createAction('allAttribute/request');
const getAllAttributeSuccess = createAction<any>('allAttribute/success');
const getAllAttributeError = createAction('allAttribute/error');

const getSubAttribute = createAction<any>('subAttribute/request');
const getSubAttributeSuccess = createAction<any>('subAttribute/success');
const getSubAttributeError = createAction('subAttribute/error');

export {
    getAttribute,
    getAttributeSuccess,
    getAttributeError,
    getAllAttribute,
    getAllAttributeSuccess,
    getAllAttributeError,
    getSubAttribute,
    getSubAttributeSuccess,
    getSubAttributeError,
};