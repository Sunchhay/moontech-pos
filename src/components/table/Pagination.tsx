import { BsThreeDots } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Pagination = () => {
    return (
        <div className='flex justify-end items-center mt-3 mb-1'>
            <div className='flex items-center gap-2 px-5 py-2.5 rounded-md hover:bg-gray-100'>
                <IoIosArrowBack size={13} />
                <span className='text-sm'>Preview</span>
            </div>
            <div className='flex items-center'>
                {
                    [...Array(3)].map((value, index) => (
                        <button key={index} className={`text-sm px-4 py-2.5 flex items-center justify-center rounded-md hover:bg-gray-100`}>
                            {index + 1}
                        </button>
                    ))
                }
                <BsThreeDots size={15} className='mx-4' />
            </div>
            <button className='flex items-center gap-2 px-5 py-2.5 rounded-md hover:bg-gray-100'>
                <span className='text-sm'>Next</span>
                <IoIosArrowForward size={13} />
            </button>
        </div>
    )
}

export default Pagination