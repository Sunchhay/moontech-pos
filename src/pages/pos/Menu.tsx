import Header from '../../components/pos/Header'
import CardOrderItem from '../../components/card/CardOrderItem'
import { AppButton } from '../../components/custom/AppButton'
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux'
import { useEffect, useState } from 'react'
import { getAllBrand } from '../../redux/actions/brand.action'
import { getAllCategory } from '../../redux/actions/category.action'
import { AppImages } from '../../utils/lib/images'
import { formatter } from '../../utils/lib/format'
import { getCart, getCartSuccess } from '../../redux/actions/cart.action'
import { getAllProduct } from '../../redux/actions/product.action'
import { ApiManager } from '../../utils/lib/api'
import { ErrorToast, SuccessToast } from '../../components/custom/Toast'
import moment from 'moment'
import NoData from '../../components/table/NoData'
import ReceiptModal from '../../components/modal/pos/ReceiptModal'
import CustomerModal from '../../components/modal/pos/CustomerModal'
import { AppInput, FormInput } from '../../components/custom/AppInput'
import { AppDropDown } from '../../components/custom/AppDropDown'

const Menu = () => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.cart.data);
    const categoryState = useAppSelector(state => state.allCategory);
    const productState = useAppSelector(state => state.allProduct.data);
    const [discount, setDiscount] = useState(0);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showCustomer, setShowCustomer] = useState(false);
    const [filter, setFilter] = useState({
        category: undefined,
    });

    useEffect(() => {
        dispatch(getAllProduct({}));
        dispatch(getAllCategory());
        dispatch(getAllBrand());
        dispatch(getCart());
    }, []);

    const handleCategory = (item: any) => {
        setFilter(prev => ({ ...prev, ['category']: item?.id }));
        dispatch(getAllProduct({ category_id: item?.id }));
    }

    const handleAddCart = (item: any, qty?: any) => {
        ApiManager.POST('cart/add', {
            product_id: qty ? item?.product_id : item?.id,
            qty: qty ?? 1
        }).then((response: any) => {
            if (response.message === true) {
                dispatch(getCartSuccess(response));
            } else {
                ErrorToast(`Try again!`);
            }
        }).catch(err => {
            ErrorToast(err?.message ?? `Try again!`);
        })
    }

    const handleDelete = (item: any) => {
        ApiManager.POST('cart/delete', { id: item?.id }).then((response: any) => {
            if (response.message === true) {
                dispatch(getCartSuccess(response));
            } else {
                ErrorToast(`Try again!`);
            }
        }).catch(err => {
            ErrorToast(err?.message ?? `Try again!`);
        })
    }

    const getSubtotal = () => {
        let subtotal = 0;
        cartState?.map((item: any) => {
            subtotal += (Number(item?.product?.sale_price ?? 0) * Number(item?.qty ?? 0));
        });
        return subtotal;
    }

    const getTotal = () => {
        let totalPrice = 0;
        totalPrice = getSubtotal() - discount;
        return totalPrice;
    }

    return (
        <div>
            <Header />
            <div className='flex relative'>
                <div className='w-full h-screen max-w-full mt-[65px] overflow-x-hidden scrollbar-hide pr-[400px] bg-gray-50'>
                    <div className='mb-2 ml-6 text-lg font-semibold mt-6'>Categories</div>
                    <div className='scrollbar-hide h-auto w-full flex gap-3.5 overflow-x-auto pt-1 pb-7'>
                        {
                            [{ id: undefined, name: 'All', image: AppImages.AllCategory }, ...categoryState.data].map((item: any) => (
                                <button onClick={() => handleCategory(item)} className={`bg-white rounded first:ml-6 last:mr-6 min-w-[115px] h-[115px] flex flex-col 
                                    justify-center gap-1.5 border px-3 shadow-sm hover:scale-[102%]
                                    ${item?.id === filter?.category ? 'border-green-500 border-[1.5px]' : 'border-gray-50'}`}>
                                    <img src={item?.image} style={{ width: 25, height: 25, borderRadius: 5, backgroundColor: 'white', objectFit: 'cover' }} />
                                    <div className={`text-gray-400 text-xs mt-3.5`}>
                                        {item?.name}
                                    </div>
                                    <div className={`text-gray-500 text-xs font-semibold`}>
                                        {(item?.id === undefined ? categoryState?.count : item?.count) + ' items'}
                                    </div>
                                </button>
                            ))
                        }
                    </div>
                    <div className='mb-3 ml-6 text-lg font-semibold'>Special menu for you</div>
                    {
                        productState?.length > 0 ? <div className='grid grid-cols-4 gap-4 px-6 pb-[100px]'>
                            {
                                productState?.map((item: any) => (
                                    <button onClick={() => handleAddCart(item)} className='px-3.5 py-4 bg-white shadow-sm rounded overflow-hidden hover:scale-[102%] text-left'>
                                        <img src={item?.image} className='w-full h-40 rounded-sm' style={{ objectFit: 'cover' }} />
                                        <div className='mt-3 text-sm text-gray-600 flex items-center'>{item?.name}</div>
                                        <div className='text-[15px] font-semibold mt-[5px]'>{formatter.format(item?.sale_price)}</div>
                                    </button>
                                ))
                            }
                        </div> : <NoData height={'h-1/2'} />
                    }
                </div>
                <div className='fixed w-[400px] h-full py-5 pt-[75px] right-0 shadow-md z-10 bg-white'>
                    <div className='flex justify-between items-center pt-3 pb-2 px-4'>
                        <div className='font-sm text-base text-center'>Checkout</div>
                        <div className='text-[13px] text-center text-gray-600'>{moment(new Date()).format('dddd, DD MMMM, YYYY')}</div>
                    </div>
                    <div className='px-3.5'>
                        <AppDropDown
                            placeholder='Select Customer'
                            addButtonTitle='Add a new customer'
                            data={[]}
                            onChange={() => { }}
                            onAddNew={() => setShowCustomer(true)}
                        />
                    </div>
                    <div className='h-[1px] bg-gray-200 mx-3'></div>
                    <div className='fixed top-[178px] right-0 bottom-[230px] order-detail-left overflow-y-auto mt-1'>
                        {
                            cartState?.map((item: any, index: any) => (
                                <CardOrderItem
                                    key={index}
                                    item={item}
                                    handleDecrease={() => handleAddCart(item, -1)}
                                    handleIncrease={() => handleAddCart(item, 1)}
                                    handleDelete={() => handleDelete(item)}
                                />
                            ))
                        }
                    </div>
                    <div className='absolute right-4 bottom-3 left-4 text-sm'>
                        <div className='h-[1px] w-full bg-gray-200 mb-4'></div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='text-gray-400'>Subtotal</div>
                            <div>{formatter.format(getSubtotal())}</div>
                        </div>
                        <div className='flex justify-between items-center mb-4'>
                            <div className='text-gray-400'>Discount</div>
                            <div className='flex items-center gap-1 text-[13px]'>
                                <div>$</div>
                                <div className='border border-gray-200 rounded py-1 px-2'>
                                    <input
                                        type='number'
                                        className='text-right'
                                        onChange={(e: any) => setDiscount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='h-[1px] w-full bg-gray-200 mb-4'></div>
                        <div className='flex justify-between items-center mb-3'>
                            <div className='text-[15px] font-semibold'>Total</div>
                            <div className='text-[15px] font-semibold'>{formatter.format(getTotal())}</div>
                        </div>
                        <div className='flex items-center justify-between gap-3 font-semibold pt-3 pb-4'>
                            <button className='h-10 w-full bg-red-400 text-white rounded hover:opacity-85'>Draft Order</button>
                            <button onClick={() => { setShowReceipt(true) }} className='h-10 w-full bg-green-500 text-white rounded hover:opacity-85'>Order Now</button>
                        </div>
                        <ReceiptModal
                            isOpen={showReceipt}
                            handleClose={() => setShowReceipt(false)}
                        />
                        <CustomerModal
                            isOpen={showCustomer}
                            handleClose={() => setShowCustomer(false)}
                            handleSubmit={() => { }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu