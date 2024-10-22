import { call, put, takeLatest } from 'redux-saga/effects';
import { getCustomer, getCustomerError, getCustomerSuccess } from '../actions/customer.action';
import { ApiManager } from '../../utils/lib/api';

const getCustomerAPI = async (payload: any) => {
  const data = await ApiManager.get(`customer/list?page=${payload.page}&keyword=${payload.keyword ?? ''}&status=${payload.status ?? ''}`);
  return data;
}

function* fetchCustomer(action: any): any {
  try {
    const response = yield call(getCustomerAPI, action.payload);
    if (response.status === 200) {
      yield put(getCustomerSuccess(response));
    } else {
      yield put(getCustomerError);
    }
  } catch (e: any) {
    yield put(getCustomerError);
  }
}

export function* watchFetchCustomer() {
  yield takeLatest(getCustomer.type, fetchCustomer);
}
