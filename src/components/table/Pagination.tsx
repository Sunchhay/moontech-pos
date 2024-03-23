import { BsThreeDots } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useEffect, useState } from 'react';
import { ErrorToast } from '../custom/Toast';

interface Props {
    totalPage?: any;
    currentPage?: any;
    setCurrentPage?: any;
}

const Pagination = (props: Props) => {
    const {
        totalPage,
        currentPage,
        setCurrentPage
    } = props;

    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    const onPrev = () => {
        setCurrentPage((prev: any) => (prev - 1));
    }

    const onSelect = (index: any) => {
        if (index !== currentPage) {
            setCurrentPage(index);
        }
    }

    const onNext = () => {
        setCurrentPage((prev: any) => (prev + 1));
    }

    const onGo = () => {
        if (Number(page) !== currentPage && page) {
            onSelect(Number(page));
        }
        if (Number(page) > totalPage) {
            ErrorToast(`Please enter number that smaller or equal ${totalPage}`);
        }
    }

    return (
        <div className='text-xs xl:text-sm flex items-center justify-between bg-white'>
            <div className='flex justify-end items-center my-1 gap-1'>
                <div className=' mr-2'>Total: {totalPage} Pages</div>
                <input
                    name={'page'}
                    className='rounded text-center border border-solid border-gray-200 w-[36px] h-[36px]'
                    value={page}
                    onChange={(e: any) => {
                        if (e.target.value > 0 || !e.target.value) {
                            setPage(e.target.value)
                        }
                    }}
                    onBlur={() => {
                        if (!page) {
                            setPage(currentPage);
                        }
                    }}
                    onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                            setCurrentPage(Number(page));
                            e.target.blur();
                        }
                    }}
                />
                <button onClick={onGo} className='rounded text-[13px] text-center w-[36px] h-[36px] bg-green-500 text-white'>Go</button>
            </div>
            <div className='flex justify-end items-center my-1 gap-2'>
                <button
                    onClick={onPrev}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-2 sm:px-5 py-2.5 rounded-md ${currentPage === 1 ? 'opacity-60' : 'hover:bg-gray-100'}`}
                >
                    <IoIosArrowBack size={13} />
                    <span className='hidden sm:block'>Preview</span>
                </button>
                <div className='flex items-center gap-1'>
                    {
                        totalPage > 7 ? <>
                            <button onClick={() => onSelect(1)} className={`${currentPage === 1 && 'border border-gray-200'}  w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                {1}
                            </button>
                            {
                                currentPage <= 4 && <>
                                    {
                                        [...Array(totalPage)].splice(0, 3).map((value, index) => (
                                            <button onClick={() => onSelect(index + 2)} key={index} className={`${index + 2 === currentPage && 'border border-gray-200'}  w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                                {index + 2}
                                            </button>
                                        ))
                                    }
                                </>
                            }
                            {
                                (currentPage > 4) && <>
                                    <BsThreeDots size={15} className='mx-1' />
                                    {
                                        currentPage < (totalPage - 3) && <>
                                            <button onClick={() => onSelect(currentPage - 1)} className={`${currentPage - 1 === currentPage && 'border border-gray-200'}  w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                                {currentPage - 1}
                                            </button>
                                            <button onClick={() => onSelect(currentPage)} className={`border border-gray-200 w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                                {currentPage}
                                            </button>
                                            <button onClick={() => onSelect(currentPage + 1)} className={`${currentPage + 1 === currentPage && 'border border-gray-200'}  w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                                {currentPage + 1}
                                            </button>
                                        </>
                                    }
                                </>
                            }
                            {
                                currentPage < (totalPage - 3) ? <BsThreeDots size={15} className='mx-1' />
                                    : <>
                                        {
                                            [...Array(totalPage)].splice(0, 3).map((value, index) => (
                                                <button onClick={() => onSelect(totalPage - 3 + index)} key={index} className={`${(totalPage - 3 + index) === currentPage && 'border border-gray-200'}  w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                                    {totalPage - 3 + index}
                                                </button>
                                            ))
                                        }
                                    </>
                            }
                            <button onClick={() => onSelect(totalPage)} className={`${currentPage === totalPage && 'border border-gray-200'}  w-[38px] h-[38px] flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                {totalPage}
                            </button>
                        </> : <>
                            {
                                [...Array(totalPage)].map((value, index) => (
                                    <button onClick={() => onSelect(index + 1)} key={index} className={`${currentPage === index + 1 && 'border border-gray-200'} text-sm px-4 py-2.5 flex items-center justify-center rounded-md hover:bg-gray-100`}>
                                        {index + 1}
                                    </button>
                                ))
                            }
                        </>
                    }
                </div>

                <button
                    onClick={onNext}
                    disabled={currentPage === totalPage}
                    className={`flex items-center gap-2 px-2 sm:px-5 py-2.5 rounded-md ${currentPage === totalPage ? 'opacity-60' : 'hover:bg-gray-100'}`}
                >
                    <span className='hidden sm:block'>Next</span>
                    <IoIosArrowForward size={13} />
                </button>
            </div >
        </div>
    )
}

export default Pagination