import { IoCloseCircleOutline } from 'react-icons/io5';
import Modal from '../Modal'
import { HiOutlineSave } from 'react-icons/hi';
import { FormInput, FormInputArea } from '../../custom/AppInput';
import { useEffect, useState } from 'react';
import { province } from '../../../utils/geo/province';
import { commune } from '../../../utils/geo/commune';
import { district } from '../../../utils/geo/district';
import { village } from '../../../utils/geo/village';
import { GeoDropDown } from '../../custom/GeoDropDown';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    handleSubmit: any;
}

const CustomerModal = ({ isOpen, handleClose, handleSubmit }: Props) => {

    const [state, setState] = useState<any>();
    const [error, setError] = useState<any>();
    const [geo, setGeo] = useState<any>();
    const [address, setAddress] = useState('');

    const handleChange = (e: any) => {
        if (e.target.value && (error && error[e.target.name])) {
            handleError(e.target.name, null);
        }
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleError = (name: any, value: any) => {
        setError((prevState: any) => ({ ...prevState, [name]: value }));
    }

    // useEffect(() => {
    //     let _address = (state?.house_no ?? '') + ' ' + (state?.street ?? '') + ' ' + (geo?.village?.name ?? '') + ' ' + (geo?.commune?.name ?? '') + ' ' + (geo?.district?.name ?? '') + ' ' + (geo?.province?.name ?? '');
    //     setAddress(_address);
    // }, [state, geo]);

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='max-h-full w-1/2 bg-white rounded-md shadow-sm pt-5 px-6 pb-3'>
                <div className='w-full flex items-center justify-between border-b border-b-gray-200 pb-3 mb-3'>
                    <div className='font-semibold text-lg'>New Customer</div>
                    <div className='flex items-center gap-1.5'>
                        <button onClick={handleClose} className='flex items-center gap-1.5 text-white text-xs bg-red-400 px-2.5 py-2 rounded-md hover:opacity-85'>
                            <IoCloseCircleOutline size={15} />
                            <span>Close</span>
                        </button>
                        <button onClick={handleSubmit} className='flex items-center gap-1.5 text-white text-xs bg-green-500 px-2.5 py-2 rounded-md hover:opacity-85'>
                            <HiOutlineSave size={15} />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <FormInput
                        label='Name'
                        name='name'
                        placeholder='Enter name'
                        value={state?.name}
                        error={error?.name}
                        onChange={handleChange}
                    />
                    <FormInput
                        label='Phone'
                        name='phone'
                        placeholder='Enter phone'
                        value={state?.phone}
                        error={error?.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <GeoDropDown
                        label='Province'
                        data={province}
                        placeholder='Select Province'
                        name='province'
                        value={geo?.province}
                        onChange={(e: any) => {
                            setGeo({ province: e.target.value })
                        }}
                    />
                    <GeoDropDown
                        label='District'
                        data={district}
                        placeholder='Select District'
                        noData='Please select province'
                        name='district'
                        value={geo?.district}
                        onChange={(e: any) => {
                            setGeo((prev: any) => ({ province: prev?.province, district: e.target.value }))
                        }}
                        parent_code={geo?.province?.code}
                        hasParent
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <GeoDropDown
                        label='Commune'
                        placeholder='Select Commune'
                        noData='Please select district'
                        data={commune}
                        name='commune'
                        value={geo?.commune}
                        onChange={(e: any) => {
                            setGeo((prev: any) => ({ province: prev?.province, district: prev?.district, commune: e.target.value }))
                        }}
                        parent_code={geo?.district?.code}
                        hasParent
                    />
                    <GeoDropDown
                        label='Village'
                        placeholder='Select Village'
                        noData='Please select commune'
                        data={village}
                        name='village'
                        value={geo?.village}
                        onChange={(e: any) => {
                            setGeo({ ...geo, village: e.target.value })
                        }}
                        parent_code={geo?.commune?.code}
                        hasParent
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <FormInput
                        label='Street'
                        name='street'
                        placeholder='Enter street'
                        value={state?.street}
                        error={error?.street}
                        onChange={handleChange}
                    />
                    <FormInput
                        label='House No'
                        name='house_no'
                        placeholder='Enter house no'
                        value={state?.house_no}
                        error={error?.house_no}
                        onChange={handleChange}
                    />
                </div>
                <FormInputArea
                    label='Address'
                    name='address'
                    placeholder='Enter address'
                    value={address}
                    error={error?.address}
                    onChange={handleChange}
                />
            </div>
        </Modal>
    )
}

export default CustomerModal