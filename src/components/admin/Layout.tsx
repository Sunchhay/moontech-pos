import React from 'react'
import Sidebar from './Sidebar'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AppImages } from '../../lib/images';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../lib/routeName';

interface Props {
    title: string;
    children?: React.ReactNode;
    onAdd?: () => void;
}

const Layout = ({ title, children, onAdd }: Props) => {
    const navigate = useNavigate();
    return (
        <>
            <Sidebar />
            <div className='ml-[280px] max-sm:ml-[0px] min-h-screen bg-gray-50 p-3'>
                <div className='flex justify-between items-center px-5 py-3 bg-white rounded-md shadow-sm'>
                    <div className='flex items-center gap-3'>
                        <span className='text-sm text-gray-600 font-semibold'>{title}</span>
                        {
                            onAdd && <button onClick={onAdd} className='flex items-center gap-1.5 text-white text-xs bg-green-500 px-2 py-1.5 rounded-md hover:opacity-85'>
                                <IoMdAddCircleOutline size={16} />
                                <span>Add New</span>
                            </button>
                        }
                    </div>
                    <button onClick={() => { navigate(RouteName.Menu) }}>
                        <img src={AppImages.SwapIcon} alt='' style={{ height: 34 }} />
                    </button>
                </div>
                {children}
            </div>
        </>
    )
}

export default Layout