import { MdDelete } from 'react-icons/md';
import { formatter } from '../../utils/lib/format'
import { AppImages } from '../../utils/lib/images'
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const CardOrderItem = ({ item, handleDecrease, handleIncrease, handleDelete }: any) => {

    return (
        <div className='flex justify-between items-center py-2 ml-7 mr-3 text-[13px] border-solid border-b-[1px] border-b-gray-200 last:border-b-[0px]'>
            <div className='flex items-center justify-center'>
                <img src={item?.product?.image ?? AppImages.Product} alt='' style={{ width: 48, height: 48, objectFit: 'cover', marginRight: 12, borderRadius: 3 }} />
                <div>
                    <div className='mb-1.5'>{item?.product?.name}</div>
                    <div className='font-semibold text-xs'>{formatter.format(item?.product?.sale_price)}</div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                {
                    item?.qty <= 1 ? <button onClick={() => handleDelete(item)}><MdDelete size={22} className='text-red-600' /></button>
                        : <button onClick={() => handleDecrease(item, -1)}><FiMinusCircle size={22} className='text-green-600' /></button>
                }
                <div className='w-8 text-center'>{item?.qty}</div>
                <button onClick={() => handleIncrease(item, 1)}><FiPlusCircle size={22} className='text-green-600' /></button>
            </div>
        </div>
    )
}

export default CardOrderItem