import { call, put, takeLatest } from 'redux-saga/effects';
import { getProduct, getProductError, getProductSuccess } from '../actions/product.action';
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
      yield put(getProductError);
    }
  } catch (e: any) {
    yield put(getProductError);
  }
}

export function* watchFetchProduct() {
  yield takeLatest(getProduct.type, fetchProduct);
}
