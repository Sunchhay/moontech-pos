import Modal from '../Modal'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { HiOutlineSave } from 'react-icons/hi';
import { FormDropdown, FormInput } from '../../custom/AppInput';

export interface IAttribute {
    id?: any;
    name: string;
    parent_id?: any;
    status: number;
}

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    state: IAttribute | undefined;
    handleSubmit: () => void;
    setState: any;
}

const AttributeModal = ({ isOpen, handleClose, state, setState, handleSubmit }: Props) => {

    const handleChange = (e: any) => {
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

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
                        <button onClick={handleSubmit} className='flex items-center gap-1.5 text-white text-xs bg-green-500 px-2.5 py-2 rounded-md hover:opacity-85'>
                            <HiOutlineSave size={15} />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className='w-[500px] flex gap-3'>
                    <div className='w-full pt-4 pb-6 pr-2'>
                        <FormInput label='Name' placeholder='Type here' name='name' value={state?.name} onChange={handleChange} />
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

export default AttributeModal