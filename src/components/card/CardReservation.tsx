import { AppImages } from '../../utils/lib/images'

const CardReservation = () => {
    return (
        <div className='flex w-full items-center gap-2 py-2 border-solid border-b-[1px] text-[13px] border-b-gray-200 last:border-b-[0px]'>
            <img src={AppImages.Product} alt='' style={{ width: 35, height: 35, objectFit: 'cover', borderRadius: 3 }} />
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <div>Double Cheese Burger</div>
                    <div>$12.21</div>
                </div>
                <div>X2</div>
            </div>
        </div>
    )
}

export default CardReservation