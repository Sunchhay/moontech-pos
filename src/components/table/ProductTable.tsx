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
import { formatter } from '../../utils/lib/format';
import { AppImages } from '../../utils/lib/images';

interface Props {
    data?: Array<any>;
    onEdit?: (value: any) => void;
    onActive?: (value: any) => void;
    onDelete?: (value: any) => void;
}

const ProductTable = ({ data, onEdit, onActive, onDelete }: Props) => {
    const [showImage, setShowImage] = useState<any>(false);

    return (
        <div className='w-full h-[560px] overflow-hidden mt-4 text-[13px] max-sm:text-xs'>
            <TableHeader>
                <div className='w-[4%] text-center'>#</div>
                <div className='w-[37%] px-5'>Name</div>
                <div className='w-[14%] px-2'>Category</div>
                <div className='w-[14%] px-2'>Brand</div>
                <div className='w-[14%] px-2'>In Stock</div>
                <div className='w-[15%] px-2'>Price</div>
                <div className='w-[7%] text-center'>Status</div>
                <div className='w-[7%] text-center'>Action</div>
            </TableHeader>
            <TableBody>
                {
                    (data && data?.length > 0) ? data?.map((item: any, index: any) => (
                        <button onDoubleClick={() => { }} key={index} className='h-[55px] w-full flex items-center text-left text-gray-700 bg-white rounded px-5 hover:bg-green-50'>
                            <div className='w-[4%] text-center text-gray-500'>{index + 1}</div>
                            <div className='w-[37%] px-5 flex items-center gap-3'>
                                <img onClick={() => setShowImage(item?.image)} src={item?.image ?? AppImages.Product} alt='' className='cursor-pointer border-[0.5px] border-gray-200' style={{ objectFit: 'cover', width: 40, height: 40, borderRadius: 3 }} />
                                <div>
                                    <div>{item?.name ?? 'N/A'}</div>
                                    <div className='flex items-center text-[11px] text-gray-500 mt-[2px]'>
                                        {
                                            item?.color?.code && <div className='w-[12px] h-[12px] rounded-full mr-1.5' style={{ backgroundColor: item?.color?.code }}></div>
                                        }
                                        {item?.sub_attribute?.name ?? 'N/A'}
                                    </div>
                                </div>
                            </div>
                            <div className='w-[14%] px-2'>
                                <span className='px-4 py-[6px] rounded bg-gray-50 text-xs'>{item?.category?.name ?? 'N/A'}</span>
                            </div>
                            <div className='w-[14%] px-2 flex items-center gap-2'>
                                {item?.brand?.image && <img src={item?.brand?.image} style={{ width: 15, height: 15, borderRadius: 15, objectFit: 'cover' }} />}
                                {item?.brand?.name ?? 'N/A'}
                            </div>
                            <div className='w-[14%] px-2'>{item?.qty ?? 0}</div>
                            <div className='w-[15%] px-2'>{formatter.format(item?.sale_price ?? 0)}</div>
                            <div className='w-[7%] flex justify-center items-center'>
                                <GoDotFill className={`${item?.status === 1 ? 'text-green-500' : 'text-gray-300'}`} />
                            </div>
                            <div className='w-[7%] flex justify-center items-center'>
                                <ActionButton
                                    isActive={item?.status === 1}
                                    icon={<BsThreeDotsVertical size={18} className='text-gray-500' />}
                                    onEdit={() => onEdit && onEdit(item)}
                                    onActive={() => onActive && onActive(item)}
                                    onDelete={() => onDelete && onDelete(item)}
                                    onPrint={() => { }}
                                    isLast={index === 9}
                                />
                            </div>
                        </button>
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