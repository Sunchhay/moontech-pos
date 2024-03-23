import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AppDropDown } from "./AppDropDown";
import { useAppSelector } from "../../utils/hook/useRedux";


export const ProductFilter = ({ data, onChange, value, placeholder }: any) => {
    const [isShow, setIsShow] = useState(false);
    const brandState = useAppSelector(state => state.allBrand);

    const toggleisShow = () => {
        setIsShow(!isShow);
    }

    return (
        <div className='relative select-none'>
            <button onClick={toggleisShow} className={`pl-4 pr-3 h-[36px] bg-gray-50 gap-1 flex justify-center items-center rounded-md ${isShow ? 'text-green-500' : 'text-gray-600'} hover:bg-green-50`}>
                <div className='text-[13px]'>{(value?.id >= 0 && value?.name) ? value?.name : placeholder}</div>
                {
                    isShow ? <IoMdArrowDropup size={18} className='text-gray-400' />
                        : <IoMdArrowDropdown size={18} className='text-gray-400' />
                }
            </button>

            <div className={`w-[150px] absolute shadow-lg py-2 top-[40px] right-0 bg-white rounded-md transition-all duration-200
              ${isShow ? 'visible opacity-100 translate-y-0' : `invisible opacity-0 -translate-y-3`} 
              border border-gray-100 border-solid z-50`}>
                <AppDropDown
                    data={brandState.data}
                    label='Brand'
                    placeholder='Select'
                    name='brand_id'
                    value={''}
                    onChange={() => { }}
                />
                {/* {
            data?.map((item: any, index: number) => (
              <button key={index} onClick={() => {
                onChange(item);
                setIsShow(false);
              }} className={`w-full flex items-center text-[13px] px-5 py-2 gap-3 hover:bg-green-50
                hover:text-green-500 ${item?.id === value?.id ? 'text-green-500' : 'text-gray-500'}`}>
                {item?.name}
              </button>
            ))
          } */}
            </div>
        </div >
    )
}