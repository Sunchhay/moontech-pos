import { combineReducers } from '@reduxjs/toolkit';
import { AllBrandReducer, BrandReducer } from './brand.reducer';
import { AllCategoryReducer, CategoryReducer } from './category.reducer';
import { AllColorReducer, ColorReducer } from './color.reducer';
import { AllAttributeReducer, AttributeReducer, SubAttributeReducer } from './attribute.reducer';
import { CustomerReducer } from './customer.reducer';
import { ProfileReducer } from './profile.reducer';
import { SideBarReducer } from './index.reducer';
import { AllProductReducer, ProductReducer } from './product.reducer';
import { CartReducer } from './cart.reducer';

const rootReducer = combineReducers({
  sideBar: SideBarReducer,
  brand: BrandReducer,
  category: CategoryReducer,
  color: ColorReducer,
  attribute: AttributeReducer,
  customer: CustomerReducer,
  profile: ProfileReducer,
  allBrand: AllBrandReducer,
  allCategory: AllCategoryReducer,
  allColor: AllColorReducer,
  allAttribute: AllAttributeReducer,
  subAttribute: SubAttributeReducer,
  product: ProductReducer,
  allProduct: AllProductReducer,
  cart: CartReducer,
});

export default rootReducer;
