import Modal from '../Modal'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { HiOutlineSave } from 'react-icons/hi';
import { FormDropdown, FormInput } from '../../custom/AppInput';
import { AppImages } from '../../../utils/lib/images';
import { AppButton } from '../../custom/AppButton';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const ReceiptModal = ({ isOpen, handleClose }: Props) => {

    const componentRef = useRef<any>();

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='max-h-full bg-white rounded-md shadow-sm pt-5 px-6'>
                <div className='w-full flex items-center justify-between border-b border-b-gray-200 pb-3'>
                    <div className='font-semibold text-lg'>Add New</div>
                    <div className='flex items-center gap-1.5'>
                        <button onClick={handleClose} className='flex items-center gap-1.5 text-white text-xs bg-red-400 px-2.5 py-2 rounded-md hover:opacity-85'>
                            <IoCloseCircleOutline size={15} />
                            <span>Close</span>
                        </button>
                    </div>
                </div>
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <a href="#">Print this out!</a>;
                    }}
                    content={() => componentRef.current}
                />
                <div ref={componentRef} className='p-4 w-[215.433px]'>
                    <img src={AppImages.LogoIcon} className='m-auto' style={{ width: 120 }} />
                    <div>Phone: 087286868</div>
                    <div>Address: Prek Mohatep Village, SvayPor Commune, Battambang District, Battambang Province</div>
                </div>
                <AppButton
                    title='Print'
                    onClick={() => { }}
                />
            </div>
        </Modal>
    )
}

export default ReceiptModal