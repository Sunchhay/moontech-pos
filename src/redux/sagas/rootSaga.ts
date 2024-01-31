import { all } from 'redux-saga/effects';
import { watchFetchAllBrand, watchFetchBrand } from './brand.saga';
import { watchFetchAllColor, watchFetchColor } from './color.saga';
import { watchFetchAllAttribute, watchFetchAttribute, watchFetchSubAttribute } from './attribute.saga';
import { watchFetchAllCategory, watchFetchCategory } from './category.saga';
import { watchFetchCustomer } from './customer.saga';
import { watchFetchProduct } from './product.saga';

function* rootSaga() {
  yield all([
    watchFetchBrand(),
    watchFetchCategory(),
    watchFetchColor(),
    watchFetchAttribute(),
    watchFetchCustomer(),
    watchFetchAllBrand(),
    watchFetchAllCategory(),
    watchFetchAllColor(),
    watchFetchAllAttribute(),
    watchFetchSubAttribute(),
    watchFetchProduct(),
  ]);
}

export default rootSaga;
