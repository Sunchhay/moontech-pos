import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getAllBrand, getAllBrandError, getAllBrandSuccess, getBrand, getBrandError, getBrandSuccess } from '../actions/brand.action';
import { ApiManager } from '../../utils/lib/api';

const getBrandAPI = async (payload: any) => {
  const data = await ApiManager.get(`brand`);
  return data;
}

function* fetchBrand(action: any): any {
  try {
    const response = yield call(getBrandAPI, action.payload);
    if (response.status === 200) {
      yield put(getBrandSuccess(response));
    } else {
      yield put(getBrandError());
    }
  } catch (e: any) {
    yield put(getBrandError());
  }
}

export function* watchFetchBrand() {
  yield takeLatest(getBrand.type, fetchBrand);
}

const getAllBrandAPI = async () => {
  const data = await ApiManager.get(`brand/list-all`);
  return data;
}

function* fetchAllBrand(action: any): any {
  try {
    const response = yield call(getAllBrandAPI);
    if (response.status === 200) {
      yield put(getAllBrandSuccess(response));
    } else {
      yield put(getAllBrandError());
    }
  } catch (e: any) {
    yield put(getAllBrandError());
  }
}

export function* watchFetchAllBrand() {
  yield takeEvery(getAllBrand.type, fetchAllBrand);
}
