import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getAllAttribute, getAllAttributeError, getAllAttributeSuccess, getAttribute, getAttributeError, getAttributeSuccess, getSubAttribute, getSubAttributeError, getSubAttributeSuccess } from '../actions/attribute.action';
import { ApiManager } from '../../utils/lib/api';

{/* List Attributes */ }
const getAttributeAPI = async (payload: any) => {
  const data = await ApiManager.get(`attribute`);
  // const data = await ApiManager.get(`attribute/list?page=${payload.page}&keyword=${payload.keyword ?? ''}&status=${payload.status ?? ''}&parent_id=${payload.parent_id ?? ''}`);
  return data;
}

function* fetchAttribute(action: any): any {
  try {
    const response = yield call(getAttributeAPI, action.payload);
    if (response.status === 200) {
      yield put(getAttributeSuccess(response));
    } else {
      yield put(getAttributeError());
    }
  } catch (e: any) {
    yield put(getAttributeError());
  }
}

export function* watchFetchAttribute() {
  yield takeLatest(getAttribute.type, fetchAttribute);
}

{/* All Attributes */ }
const getAllAttributeAPI = async () => {
  const data = await ApiManager.get(`attribute`);
  // const data = await ApiManager.get(`attribute/list-all`);
  return data;
}

function* fetchAllAttribute(): any {
  try {
    const response = yield call(getAllAttributeAPI);
    if (response.status === 200) {
      yield put(getAllAttributeSuccess(response));
    } else {
      yield put(getAllAttributeError());
    }
  } catch (e: any) {
    yield put(getAllAttributeError());
  }
}

export function* watchFetchAllAttribute() {
  yield takeEvery(getAllAttribute.type, fetchAllAttribute);
}


{/* Sub Attributes */ }
const getSubAttributeAPI = async (payload: any) => {
  const data = await ApiManager.get(`attribute/list-sub?parent_id=${payload.parent_id ?? ''}`);
  return data;
}

function* fetchSubAttribute(action: any): any {
  try {
    const response = yield call(getSubAttributeAPI, action.payload);
    if (response.status === 200) {
      yield put(getSubAttributeSuccess(response));
    } else {
      yield put(getSubAttributeError());
    }
  } catch (e: any) {
    yield put(getSubAttributeError());
  }
}

export function* watchFetchSubAttribute() {
  yield takeEvery(getSubAttribute.type, fetchSubAttribute);
}

