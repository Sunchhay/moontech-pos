import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  info: <any>{},
  classification: <any[]>[],
  listing: <any[]>[],
  paginate: <any>{},
};

const ShopDetailReducer = createReducer(initialState, builder => {
  builder
    // .addCase(clearShopDetail, state => {
    //   state.listing = [];
    // })
    // .addCase(fetchShopDetailSuccess, (state, action: { payload: IShopDetailData }) => {
    //   let _data = [...state.listing, ...action.payload.products];
    //   let datas = _.uniqBy(_data, 'id');
    //   state.listing = datas;
    //   state.paginate = action.payload.paginate;
    //   state.info = action.payload.shopInfo;
    //   state.classification = action.payload.shopClassification;
    // })
    // .addCase(fetchShopDetailError, (state, action) => {
    //   state.listing = [];
    // });
});

export { ShopDetailReducer };
