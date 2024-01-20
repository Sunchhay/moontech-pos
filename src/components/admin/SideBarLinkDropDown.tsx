import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  item: any;
}

const SideBarLinkDropDown = ({ item }: Props) => {
  let { pathname } = useLocation();
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <button onClick={() => setIsShow(prev => !prev)} className={`w-full flex items-center justify-between py-3 px-3 rounded-md ${pathname === item.path ? 'bg-green-500 text-white' : 'text-gray-600'} hover:bg-green-500 hover:text-white`}>
        <div className='flex items-center gap-3'>
          <div className='w-5 flex items-center justify-center'>{item.icon}</div>
          <div className='text-sm'>{item.title}</div>
        </div>
        {
          isShow ? <IoIosArrowUp /> : <IoIosArrowDown />
        }
      </button>
      <div className={`transition-all duration-200 ${isShow ? 'visible scale-1 opacity-1' : `invisible scale-90 opacity-0 -translate-y-2`}`}>
        {
          isShow && item?.list?.map((value: any) => (
            <NavLink to={value?.path} className={'w-full flex items-center gap-3 py-3 px-5 text-gray-600 hover:bg-green-100'}>
              <div className='w-5 flex items-center justify-center'>{item.icon}</div>
              <div className='text-sm'>{value.title}</div>
            </NavLink >
          ))
        }
      </div>
    </>
  )
}

export default SideBarLinkDropDown