import Lottie from 'lottie-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoChevronDown, IoPrint } from 'react-icons/io5';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { MdModeEdit } from 'react-icons/md';
import { IoIosCheckmarkCircle, IoIosCloseCircle, IoMdAddCircleOutline, IoMdArrowDropdown, IoMdArrowDropup, IoMdTrash } from 'react-icons/io';
import { AppLotties } from '../../utils/lib/images';

interface IAppButton {
  title: string;
  onClick?: () => void;
  className?: React.ComponentProps<'div'>['className'];
  isLoading?: boolean;
}

export const AppButton = (props: IAppButton) => {
  return (
    <button
      onClick={() => (props.onClick && !props.isLoading) && props.onClick()}
      className={`w-full h-[44px] flex justify-center items-center mb-4 rounded bg-green-500 font-semibold text-center text-white text-sm cursor-pointer ${!props.isLoading && 'hover:opacity-75'} ${props.className}`}
    >
      {!props.isLoading ? props.title : <Lottie animationData={AppLotties.Loading} loop={true} style={{ width: 60, height: 60 }} />}
    </button>
  )
}

export const FilterButton = () => {
  const [isShow, setIsShow] = useState(false);
  const containerRef = useRef<any>();

  const onMouseDown = useCallback(
    (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsShow(false);
      }
    },
    [containerRef, setIsShow]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);

    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown]);

  return (
    <div ref={containerRef} className='relative select-none'>
      <button onClick={() => setIsShow(!isShow)} className='h-[38px] flex items-center gap-1.5 px-3 rounded-md text-gray-600 hover:bg-green-50'>
        <div className='text-sm'>{'Filters'}</div>
        <IoChevronDown />
      </button>
      {
        isShow && <div className={`absolute shadow-lg min-w-[150px] py-2 top-[40px] right-0 bg-white rounded-md`}>
          {
            [Array(5)].map(() => (
              <div className='text-sm px-4 py-2'>
                {'Hello'}
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export const IconButton = ({ icon, onClick, isActive }: any) => {
  return (
    <button onClick={onClick} className={`w-[38px] h-[38px] flex justify-center items-center rounded-md ${isActive ? 'text-green-500' : 'text-gray-600'} hover:bg-green-50`}>
      {icon}
    </button>
  )
}

export const IconDropDown = ({ icon, selected = [], data = [], onSelect }: any) => {
  const [isShow, setIsShow] = useState(false);
  const containerRef = useRef<any>();

  const onMouseDown = useCallback(
    (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsShow(false);
      }
    },
    [containerRef, setIsShow]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);

    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown]);

  return (
    <div ref={containerRef} className='relative select-none'>
      <button onClick={() => setIsShow(!isShow)} className={`w-[38px] h-[38px] flex justify-center items-center rounded-md ${isShow ? 'text-green-500' : 'text-gray-600'} hover:bg-green-50`}>
        {icon}
      </button>
      {
        isShow && <div className={`absolute shadow-lg min-w-[150px] py-2 top-[40px] right-0 bg-white rounded-md border border-gray-100 border-solid z-50`}>
          {
            data?.map((item: any, index: number) => (
              <button key={index} onClick={() => onSelect(item)} className={`w-full flex items-center text-sm px-5 py-2 gap-3 hover:bg-green-50
              hover:text-green-500 ${selected.includes(item) ? 'text-green-500' : 'text-gray-400'}`}>
                {
                  selected.includes(item) ? <ImCheckboxChecked />
                    : <ImCheckboxUnchecked />
                }
                {item}
              </button>
            ))
          }
        </div>
      }
    </div>
  )
}

interface IActionButton {
  icon: React.ReactNode;
  onEdit?: () => void;
  onActive?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  isActive?: any;
  isLast?: boolean;
}

export const ActionButton = ({ icon, onEdit, onActive, onDelete, isActive, isLast, onPrint }: IActionButton) => {
  const [isShow, setIsShow] = useState(false);
  const containerRef = useRef<any>();

  const onMouseDown = useCallback(
    (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsShow(false);
      }
    },
    [containerRef, setIsShow]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);

    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown]);

  const toggleisShow = () => {
    setIsShow(!isShow);
  }

  return (
    <div ref={containerRef} className='relative select-none'>
      <button onClick={toggleisShow} className={`w-[38px] h-[38px] flex justify-center items-center rounded-md ${isShow ? 'text-green-500' : 'text-gray-600'} hover:bg-green-50`}>
        {icon}
      </button>
      <div className={`transition-all duration-200 absolute shadow-lg min-w-[150px] py-1 
        ${isShow ? 'visible opacity-100 transform: scale-1' : `invisible opacity-0 scale-75 translate-x-4 ${isLast ? '' : '-'}translate-y-4`} 
        ${isLast ? 'bottom-[40px]' : 'top-[40px]'} right-0 bg-white rounded-md border border-gray-100 border-solid z-50`}>
        {
          onEdit && <button onClick={() => {
            setIsShow(false);
            onEdit();
          }} className={`w-full flex items-center text-sm px-4 py-3 gap-3 hover:bg-green-50`}>
            <MdModeEdit size={18} className='text-purple-600' />
            <span>{'Edit'}</span>
          </button>
        }
        {
          onActive && <button onClick={() => {
            setIsShow(false);
            onActive();
          }} className={`w-full flex items-center text-sm px-4 py-3 gap-3 hover:bg-green-50`}>
            {
              !isActive ? <>
                <IoIosCheckmarkCircle size={17} className='text-green-400' />
                <span>{'Activate'}</span>
              </> : <>
                <IoIosCloseCircle size={17} className='text-pink-500' />
                <span>{'Deactivate'}</span>
              </>
            }
          </button>
        }
        {
          onPrint && <button onClick={() => {
            setIsShow(false);
            onPrint();
          }} className={`w-full flex items-center text-sm px-4 py-3 gap-3 hover:bg-green-50`}>
            <IoPrint size={18} className='text-blue-500' />
            <span>{'Print Label'}</span>
          </button>
        }
        {
          onDelete && <button onClick={() => {
            setIsShow(false);
            onDelete();
          }} className={`w-full flex items-center text-sm px-4 py-3 gap-3 hover:bg-green-50`}>
            <IoMdTrash size={18} className='text-red-500' />
            <span>{'Delete'}</span>
          </button>
        }
      </div>
    </div >
  )
}

export const CheckButton = ({ isActive, onClick, className }: any) => {
  return (
    <button onClick={onClick} className={`${className ?? 'h-[55px]'} px-1.5 flex justify-center items-center`}>
      {
        isActive ? <ImCheckboxChecked className='text-green-500' size={15} /> : <ImCheckboxUnchecked className='text-gray-400' size={15} />
      }
    </button>
  )
}

export const AddNewButton = ({ onClick }: any) => {
  return (
    <button onClick={onClick} className='h-[34px] w-[90px] flex items-center justify-center gap-1.5 text-white text-[11px] sm:text-xs bg-green-500 py-1.5 rounded-md hover:opacity-85'>
      <IoMdAddCircleOutline size={16} />
      <div>Add New</div>
    </button>
  )
}

export const AppDropDownButton = ({ data, onChange, value, placeholder }: any) => {
  const [isShow, setIsShow] = useState(false);
  const containerRef = useRef<any>();

  const onMouseDown = useCallback(
    (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsShow(false);
      }
    },
    [containerRef, setIsShow]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);

    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [onMouseDown]);

  const toggleisShow = () => {
    setIsShow(!isShow);
  }

  return (
    <div ref={containerRef} className='relative select-none'>
      <button onClick={toggleisShow} className={`pl-4 pr-3 h-[36px] bg-gray-50 gap-1 flex justify-center items-center rounded-md ${isShow ? 'text-green-500' : 'text-gray-600'} hover:bg-green-50`}>
        <div className='text-[13px]'>{(value?.id >= 0 && value?.name) ? value?.name : placeholder}</div>
        {
          isShow ? <IoMdArrowDropup size={18} className='text-gray-400' />
            : <IoMdArrowDropdown size={18} className='text-gray-400' />
        }
      </button>
      <div className={`w-[150px] absolute shadow-lg py-2 top-[40px] right-0 left-0 bg-white rounded-md transition-all duration-200
            ${isShow ? 'visible opacity-100 translate-y-0' : `invisible opacity-0 -translate-y-3`} 
            border border-gray-100 border-solid z-50`}>
        {
          data?.map((item: any, index: number) => (
            <button key={index} onClick={() => {
              onChange(item);
              setIsShow(false);
            }} className={`w-full flex items-center text-[13px] px-5 py-2 gap-3 hover:bg-green-50
              hover:text-green-500 ${item?.id === value?.id ? 'text-green-500' : 'text-gray-500'}`}>
              {item?.name}
            </button>
          ))
        }
      </div>
    </div >
  )
}