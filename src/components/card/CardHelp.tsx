import React from 'react'

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const CardHelp = ({ icon, title, description }: Props) => {
    return (
        <button className='w-1/3 bg-gray-50 flex flex-col justify-start items-center rounded-md pt-6 pb-9 px-5 hover:bg-green-50'>
            <div className='w-[50px] h-[50px] flex items-center justify-center mb-3'>{icon}</div>
            <div className='text-center font-semibold mb-2'>{title}</div>
            <div className='text-center text-sm text-gray-600'>{description}</div>
        </button>
    )
}

export default CardHelp