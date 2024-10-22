import { call, put, takeEvery } from 'redux-saga/effects';
import { getCart, getCartError, getCartSuccess } from '../actions/cart.action';
import { ApiManager } from '../../utils/lib/api';

const getCartAPI = async () => {
  const data = await ApiManager.get(`cart/list`);
  return data;
}

function* fetchCart(): any {
  try {
    const response = yield call(getCartAPI);
    if (response.status === 200) {
      yield put(getCartSuccess(response));
    } else {
      yield put(getCartError());
    }
  } catch (e: any) {
    yield put(getCartError());
  }
}

export function* watchFetchCart() {
  yield takeEvery(getCart.type, fetchCart);
}
