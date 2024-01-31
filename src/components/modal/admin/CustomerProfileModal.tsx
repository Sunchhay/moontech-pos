import { AppImages } from '../../../utils/lib/images';
import Modal from '../Modal'
import { MdTransgender } from 'react-icons/md';
import { RiPhoneFill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';

interface Props {
    state: any;
    isOpen: boolean;
    handleClose: () => void;
}

const CustomerProfileModal = ({ isOpen, state, handleClose }: Props) => {

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='relative max-h-full w-[330px] mb-[3%] bg-white rounded-md shadow-sm overflow-hidden'>
                <img src={state?.image ?? AppImages.Profile} className='w-full h-[150px] object-cover shadow-sm' />
                <div className='absolute top-16 left-0 right-0  flex items-center justify-center'>
                    <img src={state?.image ?? AppImages.Profile} className='w-[120px] h-[120px] rounded-full object-cover border-2 border-white outline outline-2 outline-green-500' />
                </div>
                <div className='px-5 pb-5 text-[13px] text-gray-600 mt-11'>
                    <div className='text-center text-base font-semibold mt-2 text-black'>{state?.name ?? 'N/A'}</div>
                    <div className='flex items-center gap-[10px] mt-3'>
                        <div className='w-5 flex items-center justify-center'><MdTransgender size={18} /></div>
                        <div>{state?.gender ?? 'N/A'}</div>
                    </div>
                    <div className='flex items-center gap-[10px] mt-3'>
                        <div className='w-5 flex items-center justify-center'><RiPhoneFill size={18} /></div>
                        <div>{state?.phone ?? 'N/A'}</div>
                    </div>
                    <div className='flex items-start gap-[10px] mt-3'>
                        <div className='w-5 flex items-center justify-center mt-1'><IoLocationSharp size={18} /></div>
                        <div>{state?.address ?? 'N/A'}</div>
                    </div>
                    <button onClick={handleClose} className='border-[1.5px] border-green-500 rounded py-2 w-full text-[13px] text-green-500 mt-5'>Close</button>
                </div>

            </div>
        </Modal>
    )
}

export default CustomerProfileModal