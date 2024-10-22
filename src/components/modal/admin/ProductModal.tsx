import { IoCloseCircleOutline } from "react-icons/io5";
import Modal from "../Modal"
import { HiOutlineSave } from "react-icons/hi";
import { FormDropdown, FormInput } from "../../custom/AppInput";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../utils/hook/useRedux";
import { getAllAttribute, getSubAttribute } from "../../../redux/actions/attribute.action";
import { getAllBrand } from "../../../redux/actions/brand.action";
import { getAllColor } from "../../../redux/actions/color.action";
import { getAllCategory } from "../../../redux/actions/category.action";
import { AppDropDown, ColorDropDown } from "../../custom/AppDropDown";
import SaveDialog from "../dialog/SaveDialog";
import axios, { ApiManager } from "../../../utils/lib/api";
import { getProduct } from "../../../redux/actions/product.action";
import { ErrorToast, SuccessToast } from "../../custom/Toast";
import DiscardDialog from "../dialog/DiscardDialog";
import { status } from "../../../utils/lib/status";

interface Props {
    data: any;
    isOpen: boolean;
    handleClose: () => void;
}

const ProductModal = ({ isOpen, handleClose, data }: Props) => {
    const dispatch = useAppDispatch();
    const brandState = useAppSelector(state => state.allBrand);
    const categoryState = useAppSelector(state => state.allCategory);
    const colorState = useAppSelector(state => state.allColor);
    const attributeState = useAppSelector(state => state.allAttribute);
    const subAttributeState = useAppSelector(state => state.subAttribute);
    const [openSave, setOpenSave] = useState(false);
    const [openDiscard, setOpenDiscard] = useState(false);
    const [state, setState] = useState<any>();
    const [error, setError] = useState<any>();

    useEffect(() => {
        dispatch(getAllBrand());
        dispatch(getAllCategory());
        dispatch(getAllColor());
        dispatch(getAllAttribute());
        setState(data);
    }, []);

    useEffect(() => {
        if (state?.attribute_id) {
            dispatch(getSubAttribute({ parent_id: state?.attribute_id }));
        }
    }, [state?.attribute_id]);

    const handleChange = (e: any) => {
        if (e.target.value && (error && error[e.target.name])) {
            handleError(e.target.name, null);
        }
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleError = (name: any, value: string | null) => {
        setError((prevState: any) => ({ ...prevState, [name]: value }));
    }

    const handleSelectImage = (e: any) => {
        const image = e.target.files[0];
        setState((prevState: any) => ({
            ...prevState,
            imageUrl: image
        }));
        const reader = new FileReader();
        reader.onload = () => {
            const imageFile = reader.result;
            setState((prevState: any) => ({
                ...prevState,
                image: imageFile,
            }));
        }
        reader.readAsDataURL(image);
    }

    const validation = () => {
        let isValid = true;
        if (!state?.name) {
            handleError('name', 'is required');
            isValid = false;
        }
        if (!state?.initial_price) {
            handleError('initial_price', 'is required');
            isValid = false;
        }
        if (!state?.sale_price) {
            handleError('sale_price', 'is required');
            isValid = false;
        }
        if (!state?.qty) {
            handleError('qty', 'is required');
            isValid = false;
        }
        // if (!state?.alert_qty) {
        //     handleError('alert_qty', 'is required');
        //     isValid = false;
        // }
        // if (!state?.brand_id) {
        //     handleError('brand_id', 'is required');
        //     isValid = false;
        // }
        // if (!state?.category_id) {
        //     handleError('category_id', 'is required');
        //     isValid = false;
        // }
        // if (!state?.color_id) {
        //     handleError('color_id', 'is required');
        //     isValid = false;
        // }
        // if (!state?.attribute_id) {
        //     handleError('attribute_id', 'is required');
        //     isValid = false;
        // }
        // if (!state?.sub_attribute_id) {
        //     handleError('sub_attribute_id', 'is required');
        //     isValid = false;
        // }
        if (isValid) {
            setOpenSave(true);
        }
    }

    const handleSave = () => {
        setOpenSave(false);
        const formdata: any = new FormData();
        for (var key in state) {
            (key !== 'imageUrl') && formdata.append(key, state[key]);
        }
        formdata.set('image', state?.imageUrl ? state?.imageUrl : state?.image);
        axios.post(state?.id ? 'product/update' : 'product/create', formdata).then((response) => {
            if (response.data.message === true) {
                dispatch(getProduct({ page: 1 }));
                handleClose();
                SuccessToast('Success', `${state?.name} has been created successfully!`)
            } else {
                ErrorToast('Error', response.data.error ?? 'Something went wrong!');
            }
        }).catch((err) => {
            ErrorToast('Error', err.message);
        });
    }

    return (
        <>
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <div id='demo' className='w-full max-h-full bg-gray-50 rounded-md shadow-sm pt-5 px-3 sm:px-6 overflow-hidden'>
                    <div className='w-full flex items-center justify-between border-b border-b-gray-200 pb-3 mb-3'>
                        <div className='font-semibold ml-2 text-md sm:ml-0 sm:text-lg'>Add New Product</div>
                        <div className='flex items-center gap-1.5'>
                            <button onClick={() => {
                                if (state) {
                                    setOpenDiscard(true);
                                } else {
                                    handleClose();
                                }
                            }} className='flex items-center gap-1.5 text-white text-xs bg-red-400 px-2.5 py-2 rounded-md hover:opacity-85'>
                                <IoCloseCircleOutline size={15} />
                                <span>Discard</span>
                            </button>
                            <button onClick={validation} className='flex items-center gap-1.5 text-white text-xs bg-green-500 px-2.5 py-2 rounded-md hover:opacity-85'>
                                <HiOutlineSave size={15} />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-3 overflow-y-auto max-h-[93%] pb-30 sm:pb-4 scrollbar-hide">
                        <div className="sm:w-[65%]">
                            <div className="bg-white px-4 py-5 md:px-5 mb-3 shadow-sm">
                                <div className="mb-3">General Information</div>
                                <FormInput
                                    label='Product Name'
                                    placeholder='Enter product name'
                                    name='name'
                                    value={state?.name}
                                    error={error?.name}
                                    onChange={handleChange}
                                />
                                <div className='text-gray-600 mb-[5px] text-[13px]'>Product Image</div>
                                <label htmlFor='getFile' className={`${state?.image ? 'border-white' : 'border-gray-200'} w-[152px] h-[152px] border-2 border-dashed flex flex-col items-center justify-center rounded mb-3`}>
                                    {
                                        state?.image ? <img src={state?.image} alt='' width={152} height={152} style={{ width: 152, height: 152, objectFit: 'cover', borderRadius: 6 }} />
                                            : <>
                                                <FaCamera className='text-gray-300' size={30} />
                                                <div className='text-sm text-gray-400 mt-2'>Add Image</div>
                                                <div className='text-[13px] text-gray-400 mt-1'>512 x 512</div>
                                            </>
                                    }
                                </label>
                                <input id='getFile' type='file' name="profile" value='' onChange={handleSelectImage} accept="image/png, image/jpeg" hidden />

                            </div>
                            <div className="bg-white px-4 py-5 md:px-5 mb-3 shadow-sm">
                                <div className="mb-3">Variation</div>
                                <AppDropDown
                                    data={brandState.data}
                                    label='Brand'
                                    placeholder='Select'
                                    name='brand_id'
                                    value={state?.brand_id}
                                    onChange={handleChange}
                                />
                                <AppDropDown
                                    data={categoryState.data}
                                    label='Category'
                                    placeholder='Select'
                                    name='category_id'
                                    value={state?.category_id}
                                    onChange={handleChange}
                                />
                                <ColorDropDown
                                    data={colorState.data}
                                    label='Color'
                                    placeholder='Select'
                                    name='color_id'
                                    value={state?.color_id}
                                    onChange={handleChange}
                                />
                                <AppDropDown
                                    data={attributeState.data}
                                    label='Attribute'
                                    placeholder='Select'
                                    name='attribute_id'
                                    value={state?.attribute_id}
                                    onChange={handleChange}
                                />
                                <AppDropDown
                                    data={subAttributeState.data}
                                    label='Select'
                                    placeholder='Select'
                                    name='sub_attribute_id'
                                    value={state?.sub_attribute_id}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="sm:w-[35%]">
                            <div className="bg-white px-4 py-5 md:px-5 mb-3 shadow-sm">
                                <div className="mb-3">Pricing</div>
                                <FormInput
                                    label='Initial Price'
                                    placeholder='Enter initial price'
                                    name='initial_price'
                                    value={state?.initial_price}
                                    error={error?.initial_price}
                                    onChange={handleChange}
                                />
                                <FormInput
                                    label='Sale Price'
                                    placeholder='Enter sale price'
                                    name='sale_price'
                                    value={state?.sale_price}
                                    error={error?.sale_price}
                                    onChange={handleChange}
                                />
                                <div className="flex items-center gap-3">
                                    <FormInput
                                        label='Discount'
                                        placeholder='Enter discount'
                                        name='discount'
                                        value={state?.discount}
                                        onChange={handleChange}
                                    />
                                    <FormDropdown
                                        data={[{ id: 'percentage', name: 'Percentage' }, { id: 'amount', name: 'Amount' }]}
                                        label='Discount Type'
                                        placeholder='Select'
                                        name='discount_type'
                                        value={state?.discount_type}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="bg-white px-4 py-5 md:px-5 mb-3 shadow-sm">
                                <div className="mb-3">Inventory</div>
                                <FormInput
                                    label='Quantity In Stock'
                                    placeholder='Enter number'
                                    name='qty'
                                    value={state?.qty}
                                    error={error?.qty}
                                    onChange={handleChange}
                                    type={'number'}
                                />
                                <FormInput
                                    label='Alert Quantity'
                                    placeholder='Enter number'
                                    name='alert_qty'
                                    value={state?.alert_qty}
                                    error={error?.alert_qty}
                                    onChange={handleChange}
                                    type={'number'}
                                />
                                <FormInput
                                    label='SKU'
                                    placeholder='Enter SKU'
                                    name='sku'
                                    value={state?.sku}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="bg-white px-4 py-5 md:px-5 mb-3 shadow-sm">
                                <div className="mb-3">Status</div>
                                <FormDropdown
                                    data={status}
                                    label='Status'
                                    placeholder='Select'
                                    name='status'
                                    value={state?.status}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
            <SaveDialog
                isOpen={openSave}
                handleClose={() => setOpenSave(false)}
                handleSave={handleSave}
            />
            <DiscardDialog
                isOpen={openDiscard}
                handleClose={() => setOpenDiscard(false)}
                handleSubmit={() => {
                    setOpenDiscard(false);
                    handleClose();
                }}
            />
        </>
    )
}

export default ProductModal