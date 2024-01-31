import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getAllCategory, getAllCategoryError, getAllCategorySuccess, getCategory, getCategoryError, getCategorySuccess } from '../actions/category.action';
import { ApiManager } from '../../utils/lib/axios';

const getCategoryAPI = async (payload: any) => {
  const data = await ApiManager.get(`category/list?page=${payload.page}&keyword=${payload.keyword ?? ''}&status=${payload.status ?? ''}`);
  return data;
}

function* fetchCategory(action: any): any {
  try {
    const response = yield call(getCategoryAPI, action.payload);
    if (response.status === 200) {
      yield put(getCategorySuccess(response));
    } else {
      yield put(getCategoryError());
    }
  } catch (e: any) {
    yield put(getCategoryError());
  }
}

export function* watchFetchCategory() {
  yield takeLatest(getCategory.type, fetchCategory);
}

const getAllCategoryAPI = async () => {
  const data = await ApiManager.get(`category/list-all`);
  return data;
}

function* fetchAllCategory(): any {
  try {
    const response = yield call(getAllCategoryAPI);
    if (response.status === 200) {
      yield put(getAllCategorySuccess(response));
    } else {
      yield put(getAllCategoryError());
    }
  } catch (e: any) {
    yield put(getAllCategoryError());
  }
}

export function* watchFetchAllCategory() {
  yield takeEvery(getAllCategory.type, fetchAllCategory);
}
