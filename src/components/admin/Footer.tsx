import { AppImages } from '../../utils/lib/images'

const Footer = () => {
    return (
        <div className='flex items-center justify-between px-1 mb-20'>
            <img src={AppImages.Logo} alt='' style={{ height: 11 }} />
            <div className='text-sm text-gray-500'>© All Rights Reserved.</div>
        </div>
    )
}

export default Footer