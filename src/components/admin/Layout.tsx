import React from 'react'
import { AppImages } from '../../utils/lib/images';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../utils/lib/routeName';
import Footer from './Footer';
import { IoArrowBack } from 'react-icons/io5';
import { CgMenuLeftAlt } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import { handleSideBar } from '../../redux/actions/index.action';

interface Props {
    title: string;
    enabledBack?: boolean;
    onBack?: () => void;
    children?: React.ReactNode;
}

const Layout = ({ title, children, onBack, enabledBack }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isShow = useAppSelector(state => state.sideBar)
    return (
        <div className={`transition-all duration-500 ${isShow ? 'sm:ml-[280px]' : 'sm:ml-0'} scrollbar-hide overflow-y-auto h-screen bg-gray-50 p-3`}>
            <div className='flex justify-between items-center px-5 py-3 bg-white rounded-md shadow-sm'>
                <div className='flex items-center gap-1'>
                    <button onClick={() => dispatch(handleSideBar(!isShow))} className=' mr-2 p-1 rounded-md -ml-1 text-gray-700 '>
                        <CgMenuLeftAlt size={24} />
                    </button>
                    {
                        (enabledBack && onBack) && <button onClick={onBack} className='p-2 -ml-2'><IoArrowBack className='text-gray-600' /></button>
                    }
                    <span className='text-sm text-gray-600 font-semibold'>{title}</span>
                </div>
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