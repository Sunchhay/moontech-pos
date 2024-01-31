import Modal from '../Modal'

interface Props {
    isOpen: boolean;
    handleSave?: () => void;
    handleClose: () => void;
}

const SaveDialog = ({ isOpen, handleClose, handleSave }: Props) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='bg-white w-[450px] rounded-lg px-6 py-5 mb-8'>
                <div className='text-black font-bold mb-2'>Save</div>
                <div className='text-gray-600 text-sm'>Are you sure you want to save?</div>
                <div className='flex justify-end items-center gap-2 pt-5'>
                    <button onClick={handleClose} className='border border-gray-200 rounded py-[7px] px-4 text-sm hover:bg-gray-50'>Cancel</button>
                    <button onClick={handleSave} className='bg-green-500 rounded py-[7px] px-4 text-sm text-white hover:opacity-85'>Save</button>
                </div>
            </div>
        </Modal>
    )
}

export default SaveDialog