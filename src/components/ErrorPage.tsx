import { AppImages } from '../lib/images'

const ErrorPage = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <img src={AppImages.NotFound} alt='' style={{ width: '70%' }} />
        </div>
    )
}

export default ErrorPage