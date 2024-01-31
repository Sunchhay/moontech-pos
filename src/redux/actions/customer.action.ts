import { createAction } from '@reduxjs/toolkit';

const getCustomer = createAction<any>('customer/request');
const getCustomerSuccess = createAction<any>('customer/success');
const getCustomerError = createAction<any>('customer/error');

export { getCustomer, getCustomerSuccess, getCustomerError };