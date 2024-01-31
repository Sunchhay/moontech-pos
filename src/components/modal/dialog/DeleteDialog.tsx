import Modal from '../Modal'

interface Props {
    isOpen: boolean;
    handleDelete?: () => void;
    handleClose: () => void;
    title?: string;
}

const DeleteDialog = ({ isOpen, handleClose, handleDelete, title }: Props) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='bg-white rounded-lg px-6 py-5 mb-8'>
                <div className='text-black font-bold mb-2'>{`Are you sure you want to delete ${title && `'${title}'`}?`}</div>
                <div className='text-gray-600 text-sm'>This item will be deleted immediately. You can't undo this action.</div>
                <div className='flex justify-end items-center gap-2 pt-5'>
                    <button onClick={handleClose} className='border border-gray-200 rounded py-[7px] px-4 text-sm hover:bg-gray-50'>Cancel</button>
                    <button onClick={handleDelete} className='bg-red-600 rounded py-[7px] px-4 text-sm text-white hover:opacity-85'>Delete</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteDialog