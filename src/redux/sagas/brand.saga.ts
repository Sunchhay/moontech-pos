import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchCountry(): any {
  try {
    // const response = yield call(getCountry);
    // if (response) {
    // yield put(fetchCountrySuccess(response));
    // } else {
    // yield put(fetchCountryError);
    // }
  } catch (e: any) {
    // yield put(fetchCountryError);
  }
}

export function* watchFetchCountry() {
  // yield takeEvery(handleFetchCountry.type, fetchCountry);
}
