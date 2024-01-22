import React from 'react'
import { AppImages } from '../../utils/lib/images';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../utils/lib/routeName';
import Footer from './Footer';

interface Props {
    title: string;
    children?: React.ReactNode;
}

const Layout = ({ title, children }: Props) => {
    const navigate = useNavigate();
    return (
        <div className='scrollbar-hide overflow-y-auto ml-[280px] max-sm:ml-[0px] h-screen bg-gray-50 p-3'>
            <div className='flex justify-between items-center px-5 py-3 bg-white rounded-md shadow-sm'>
                <span className='text-sm text-gray-600 font-semibold'>{title}</span>
                <button onClick={() => { navigate(RouteName.Menu) }}>
                    <img src={AppImages.SwapIcon} alt='' style={{ height: 34 }} />
                </button>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default Layout