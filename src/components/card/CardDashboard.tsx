
const CardDashboard = ({ item }: any) => {
    return (
        <button className='flex gap-3 w-full bg-white rounded shadow-sm p-4 text-sm text-left'>
            <div className="w-[30px] h-[30px] flex justify-center">
                {item?.icon}
            </div>
            <div className={'flex flex-col items-start'}>
                <div className='font-semibold text-gray-600 mb-1'>{item.title}</div>
                <div className='font-bold mb-1 text-base'>{item.number}</div>
                <div className='text-[13px]'>
                    <span className={item.change > 0 ? 'text-green-600' : 'text-red-600'}>
                        {item.change}%
                    </span>{" "}
                    {item.change > 0 ? "more" : "less"} than previous week
                </div>
            </div>
        </button>
    )
}

export default CardDashboard