import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableRow from './TableRow'
import { GoDotFill } from 'react-icons/go';
import { ActionButton } from '../custom/AppButton';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import NoData from './NoData';

interface Props {
    data?: Array<any>;
    onEdit?: (value: any) => void;
    onActive?: (value: any) => void;
    onDelete?: (value: any) => void;
}

const ProductTable = ({ data, onEdit, onActive, onDelete }: Props) => {
    const [showImage, setShowImage] = useState<any>(false);

    return (
        <div className='w-full h-[560px] mt-4 text-[13px] max-sm:text-xs'>
            <TableHeader>
                <div className='w-[4%] text-center'>#</div>
                <div className='w-full px-5'>Name</div>
                <div className='w-full px-2'>Category</div>
                <div className='w-full px-2'>Brand</div>
                <div className='w-full px-2'>Qty In Stock</div>
                <div className='w-full px-2'>Price</div>
                <div className='flex justify-center items-center'>
                    <div className='w-[80px] text-center'>Status</div>
                    <div className='w-[100px] text-center'>Action</div>
                </div>
            </TableHeader>
            <TableBody>
                {
                    (data && data?.length > 0) ? data?.map((item: any, index: any) => (
                        <TableRow key={index}>
                            <div className='w-[4%] text-center text-gray-500'>{index + 1}</div>
                            <div className='w-full px-5 flex items-center gap-3'>
                                <img onClick={() => setShowImage(item?.image)} src={item?.image} alt='' className='cursor-pointer border-[0.5px] border-gray-200' style={{ objectFit: 'cover', width: 36, height: 36, borderRadius: 3 }} />
                                <div>{item?.name}</div>
                            </div>
                            <div className='w-full px-2'>Category</div>
                            <div className='w-full px-2'>Brand</div>
                            <div className='w-full px-2'>Qty In Stock</div>
                            <div className='w-full px-2'>Price</div>
                            <div className='flex justify-center items-center'>
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

export default ProductTable