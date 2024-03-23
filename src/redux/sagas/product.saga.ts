import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getAllProduct, getAllProductError, getAllProductSuccess, getProduct, getProductError, getProductSuccess } from '../actions/product.action';
import { ApiManager } from '../../utils/lib/axios';

const getProductAPI = async (payload: any) => {
  const data = await ApiManager.get(`product/list?page=${payload.page}&keyword=${payload.keyword ?? ''}&status=${payload.status ?? ''}`);
  return data;
}

function* fetchProduct(action: any): any {
  try {
    const response = yield call(getProductAPI, action.payload);
    if (response.status === 200) {
      yield put(getProductSuccess(response));
    } else {
      yield put(getProductError());
    }
  } catch (e: any) {
    yield put(getProductError());
  }
}

export function* watchFetchProduct() {
  yield takeLatest(getProduct.type, fetchProduct);
}

const getAllProductAPI = async (payload: any) => {
  const data = await ApiManager.get(`product/list-all?category_id=${payload.category_id ?? null}`);
  return data;
}

function* fetchAllProduct(action: any): any {
  try {
    const response = yield call(getAllProductAPI, action.payload);
    if (response.status === 200) {
      yield put(getAllProductSuccess(response));
    } else {
      yield put(getAllProductError());
    }
  } catch (e: any) {
    yield put(getAllProductError());
  }
}

export function* watchFetchAllProduct() {
  yield takeEvery(getAllProduct.type, fetchAllProduct);
}
