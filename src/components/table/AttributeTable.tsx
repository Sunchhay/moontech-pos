import TableHeader from './TableHeader'
import TableBody from './TableBody'
import { GoDotFill } from 'react-icons/go';
import { ActionButton } from '../custom/AppButton';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import NoData from './NoData';
import { IoArrowForward } from 'react-icons/io5';
import TableRow from './TableRow';

interface Props {
    disabled: any;
    data: Array<any>;
    onClick?: (value: any) => void;
    onEdit?: (value: any) => void;
    onActive?: (value: any) => void;
    onDelete?: (value: any) => void;
}

const AttributeTable = ({ data, onEdit, onActive, onDelete, onClick, disabled }: Props) => {
    const [showImage, setShowImage] = useState<any>(false);

    return (
        <div className='w-full h-[560px] mt-4 text-[13px] max-sm:text-xs'>
            <TableHeader>
                <div className='w-[4%] text-center'>#</div>
                <div className='w-full px-5 flex items-center'>
                    <div className='w-full'>Name</div>
                    {
                        !disabled && <div className='w-[120px] text-center'>Total Items</div>
                    }
                </div>
                <div className='flex justify-center items-center'>
                    <div className='w-[80px] text-center'>Status</div>
                    <div className='w-[100px] text-center'>Action</div>
                    {
                        !disabled && <div className='w-[25px]' />
                    }
                </div>
            </TableHeader>
            <TableBody>
                {
                    (data && data?.length) > 0 ? data?.map((item: any, index: any) => (
                        <TableRow key={index}>
                            <div className='w-[4%] text-center text-gray-500'>{index + 1}</div>
                            <div className='w-full px-5 text-left flex items-center'>
                                <div className='w-full'>{item?.name}</div>
                                {
                                    !disabled && <div className='w-[120px] flex justify-center items-center'>{item?.count ?? 0}</div>
                                }
                            </div>
                            <div className='flex items-center'>
                                <div className='w-[80px] flex justify-center items-center'>
                                    <GoDotFill className={`${item?.status === 1 ? 'text-green-500' : 'text-gray-300'}`} />
                                </div>
                                <div className='w-[100px] flex justify-center items-center'>
                                    <ActionButton
                                        isActive={item?.status === 1}
                                        icon={<BsThreeDotsVertical size={18} className='text-gray-500' />}
                                        onEdit={() => onEdit && onEdit(item)}
                                        onActive={() => onActive && onActive(item)}
                                        onDelete={() => onDelete && onDelete(item)}
                                        isLast={index === 9}
                                    />
                                </div>
                                {
                                    !disabled && <button onClick={() => (!disabled && onClick) && onClick(item)} className='w-[25px] h-6 flex justify-center items-center'><IoArrowForward className='text-gray-500' size={15} /></button>
                                }
                            </div>
                        </TableRow>
                    )) : <NoData />
                }
            </TableBody>
            {
                showImage && <Lightbox
                    open={showImage}
                    close={() => setShowImage(false)}
                    slides={[{ src: showImage }]}
                    plugins={[Fullscreen]}
                    controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                    render={{
                        buttonPrev: () => null,
                        buttonNext: () => null,
                    }}
                />
            }
        </div>
    )
}

export default AttributeTable