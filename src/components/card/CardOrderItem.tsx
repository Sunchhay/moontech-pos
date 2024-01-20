import { AppImages } from '../../lib/images'

const CardOrderItem = () => {
    return (
        <div className='flex w-full items-center py-2 border-solid border-b-[1px] border-b-gray-200 last:border-b-[0px]'>
            <img src={AppImages.Product} alt='' style={{ width: 48, height: 48, objectFit: 'cover', marginRight: 12, borderRadius: 3 }} />
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <div className='text-sm mb-1'>Double Cheese Burger</div>
                    <div className='text-sm'>$12.21</div>
                </div>
                <div className='text-sm'>X2</div>
            </div>
        </div>
    )
}

export default CardOrderItem