import { AppImages } from '../../utils/lib/images'

interface Props {
    height?: any;
}

const NoData = ({ height }: Props) => {
    return (
        <div className={`h-[95%] pb-14 flex flex-col items-center justify-center ${height}`}>
            <img src={AppImages.NoData} style={{ width: 120, height: 'auto' }} />
            <div className='mt-4 text-base'>No data found</div>
            <div className='mt-1 text-[13px] text-gray-500'>Data is empty or Try adjusting your filter</div>
        </div>
    )
}

export default NoData