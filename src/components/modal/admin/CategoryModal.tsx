import Modal from '../Modal'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { HiOutlineSave } from 'react-icons/hi';
import { FormDropdown, FormInput } from '../../custom/AppInput';
import { FaCamera } from 'react-icons/fa';

export interface ICategory {
    id?: any;
    name: string;
    image: string;
    imageUrl: string;
    status: any;
}

interface Props {
    state: any;
    setState: any;
    isOpen: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
}

const CategoryModal = ({ isOpen, handleClose, state, setState, handleSubmit }: Props) => {

    const handleChange = (e: any) => {
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
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

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='max-h-full bg-white rounded-md shadow-sm pt-5 px-6'>
                <div className='w-full flex items-center justify-between border-b border-b-gray-200 pb-3'>
                    <div className='font-semibold text-lg'>Add New Category</div>
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
                <div className='w-[700px] flex gap-3'>
                    <div className='pb-40 pr-5 pt-5 flex justify-start border-r border-r-gray-200'>
                        <label htmlFor='getFile' className={`w-[180px] h-[180px] ${state?.image ? 'border-0' : 'border-2'} border-dashed flex flex-col items-center justify-center border-gray-200 rounded overflow-hidden`}>
                            {
                                state?.image ? <img src={state?.image} alt='' width={250} height={250} style={{ width: 250, height: 250, objectFit: 'cover', borderRadius: 6 }} />
                                    : <>
                                        <FaCamera className='text-gray-300' size={50} />
                                        <div className='text-sm text-gray-400 mt-4'>Add Image</div>
                                        <div className='text-sm text-gray-400 mt-3'>512 x 512</div>
                                    </>
                            }
                        </label>
                        <input id='getFile' type='file' name="profile" value='' onChange={handleSelectImage} accept="image/png, image/jpeg" hidden />
                    </div>
                    <div className='w-full pt-4 pb-5 pr-2'>
                        <FormInput label='Category Name' placeholder='Type here' name='name' value={state?.name} onChange={handleChange} />
                        <FormDropdown
                            label='Status'
                            name='status'
                            placeholder='Select'
                            data={[{ id: 1, name: 'Active' }, { id: 0, name: 'Disable' }]}
                            value={state?.status}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CategoryModal