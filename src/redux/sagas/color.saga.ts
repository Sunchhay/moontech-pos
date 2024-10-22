import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getAllColor, getAllColorError, getAllColorSuccess, getColor, getColorError, getColorSuccess } from '../actions/color.action';
import { ApiManager } from '../../utils/lib/api';

const getColorAPI = async (payload: any) => {
  const data = await ApiManager.get(`color/list?page=${payload.page}&keyword=${payload.keyword ?? ''}&status=${payload.status ?? ''}`);
  return data;
}

function* fetchColor(action: any): any {
  try {
    const response = yield call(getColorAPI, action.payload);
    if (response.status === 200) {
      yield put(getColorSuccess(response));
    } else {
      yield put(getColorError());
    }
  } catch (e: any) {
    yield put(getColorError());
  }
}

export function* watchFetchColor() {
  yield takeLatest(getColor.type, fetchColor);
}

const getAllColorAPI = async () => {
  const data = await ApiManager.get(`color/list-all`);
  return data;
}

function* fetchAllColor(): any {
  try {
    const response = yield call(getAllColorAPI);
    if (response.status === 200) {
      yield put(getAllColorSuccess(response));
    } else {
      yield put(getAllColorError());
    }
  } catch (e: any) {
    yield put(getAllColorError());
  }
}

export function* watchFetchAllColor() {
  yield takeEvery(getAllColor.type, fetchAllColor);
}