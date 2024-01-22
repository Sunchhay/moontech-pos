
const CardSummary = ({ item }: any) => {
    return (
        <button className='flex items-center justify-between gap-3 w-full bg-white rounded shadow-sm p-4 text-sm'>
            <div className={'flex flex-col items-start'}>
                <div className='font-semibold text-gray-600 mb-1'>{item.title}</div>
                <div className='font-bold mb-1 text-base'>{item.number}</div>
            </div>
            <div className="w-[30px] h-[30px] flex justify-center">
                {item?.icon}
            </div>
        </button>
    )
}

export default CardSummary