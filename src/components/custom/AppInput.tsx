import { HTMLInputTypeAttribute, useCallback, useEffect, useRef, useState } from 'react'
import { IoEyeSharp, IoEyeOff, IoSearch } from "react-icons/io5";
import { IoIosWarning, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface IAppInput {
    name?: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    value?: any;
    error?: any;
    onChange?: (e: any) => void;
    placeholder?: string;
    width?: string;
}

export const AppInput = (props: IAppInput) => {
    const [isFocus, setIsFocus] = useState(false);
    return <div className='w-full mb-4'>
        <div className='text-sm text-gray-600 mb-[6px]'>{props.label}</div>
        <div className={`flex items-center rounded border border-solid ${isFocus ? 'border-teal-500' : props.error ? 'border-red-500' : 'border-gray-200'}`}>
            <input
                name={props.name}
                placeholder={props.label}
                className='w-full rounded text-sm px-4 py-[11px]'
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type={props.type ? props.type : 'text'}
                value={props.value ?? ''}
                onChange={props.onChange}
            />
            {
                props.error && <IoIosWarning size={20} color={'red'} style={{ marginRight: 16 }} />
            }
        </div>
    </div>
}

export const PasswordInput = (props: IAppInput) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isShow, setIsShow] = useState(false);
    return <div className='w-full mb-4'>
        <div className='text-sm mb-[6px]'>{props.label}</div>
        <div className={`${'flex justify-between items-center px-4 rounded border border-solid'} ${isFocus ? 'border-teal-500' : 'border-gray-200'}`}>
            <input
                name={props.name}
                placeholder={props.label}
                className='w-full rounded text-sm py-[12px]'
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type={isShow ? 'text' : 'password'}
                value={props.value ?? ''}
                onChange={props.onChange}
            />
            {
                props.error ? <IoIosWarning size={20} color={'red'} />
                    : <button onClick={() => setIsShow(!isShow)}>
                        {isShow ? <IoEyeSharp size={20} /> : <IoEyeOff size={20} />}
                    </button>
            }
        </div>
    </div>
}

export const SearchInput = ({ placeholder, value, onChange }: any) => {
    return <div className='flex items-center gap-2.5 px-1'>
        <IoSearch className='text-gray-400' size={20} />
        <input type='text' placeholder={placeholder ? placeholder : 'Search...'} value={value ?? ''} onChange={onChange} className='w-full text-sm text-gray-4' />
    </div>
}

export const FormInput = (props: IAppInput) => {
    const [isFocus, setIsFocus] = useState(false);
    return <div className={`${props.width ? props.width : 'w-full'} mb-4`}>
        <div className='flex items-center text-[13px] text-gray-600 mb-[3px]'>
            {props.label}
            {props.error && <div className='text-red-500 ml-1'>{props.error}</div>}
        </div>
        <div className={`flex items-center rounded border border-solid bg-gray-50 ${isFocus ? 'border-teal-500' : props.error ? 'border-red-500' : 'border-gray-200'}`}>
            <input
                name={props.name}
                placeholder={props.placeholder}
                className='w-full rounded text-[13px] px-3 py-[8px] bg-transparent'
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type={props.type ? props.type : 'text'}
                value={props.value ?? ''}
                onChange={props.onChange}
                autoComplete='off'
            />
            {
                props.error && <IoIosWarning size={20} color={'red'} style={{ marginRight: 16 }} />
            }
        </div>
    </div>
}

export const FormPasswordInput = (props: IAppInput) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isShow, setIsShow] = useState(false);
    return <div className='w-full mb-4'>
        <div className='text-[13px] text-gray-600 mb-[3px]'>{props.label}</div>
        <div className={`${'flex justify-between items-center pl-3 pr-4 rounded border border-solid'} ${isFocus ? 'border-teal-500' : props.error ? 'border-red-500' : 'border-gray-200'}`}>
            <input
                name={props.name}
                placeholder={props.placeholder}
                className='w-full rounded text-[13px] py-[8px]'
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type={isShow ? 'text' : 'password'}
                value={props.value ?? ''}
                onChange={props.onChange}
            />
            {
                props.error ? <IoIosWarning size={17} color={'red'} />
                    : <button onClick={() => setIsShow(!isShow)}>
                        {isShow ? <IoEyeSharp size={17} color={'gray'} /> : <IoEyeOff size={17} color={'gray'} />}
                    </button>
            }
        </div>
    </div>
}

export const FormInputArea = (props: IAppInput) => {
    const [isFocus, setIsFocus] = useState(false);
    return <div className={`${props.width ? props.width : 'w-full'} mb-4`}>
        <div className='text-[13px] text-gray-600 mb-[3px]'>{props.label}</div>
        <div className={`${'flex items-center rounded border border-solid'} ${isFocus ? 'border-teal-500' : props.error ? 'border-red-500' : 'border-gray-200'}`}>
            <textarea
                name={props.name}
                placeholder={'Write something...'}
                className='w-full rounded text-[13px] px-4 py-3 h-36'
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                value={props.value ?? ''}
                onChange={props.onChange}
                autoComplete='off'

            />
            {
                props.error && <IoIosWarning size={20} color={'red'} style={{ marginRight: 16 }} />
            }
        </div>
    </div>
}

interface IDropdown {
    data: Array<any>;
    label: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    value: any;
    onChange: (e: any) => void;
    placeholder?: string;
    width?: string;
}

export const FormDropdown = (props: IDropdown) => {
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
        document.body.addEventListener("click", onMouseDown);
        return () => {
            document.body.removeEventListener("click", onMouseDown);
        };
    }, [onMouseDown]);

    const getPlaceholder = () => {
        let data = props.data?.find(item => props.value === item.id);
        return data ? data?.name : null;
    }

    return <div ref={containerRef} className={`relative ${props.width ? props.width : 'w-full'}  mb-4 text-[13px] `}>
        <div className='text-gray-600 mb-[3px]'>{props.label}</div>
        <button onClick={() => setIsShow(!isShow)} className={`${getPlaceholder() ? 'text-black' : 'text-gray-400'} ${'w-full px-3 py-[8px] flex justify-between items-center rounded border border-solid'} ${isShow ? 'border-teal-500' : 'border-gray-200'} bg-gray-50`}>
            {getPlaceholder() ?? props.placeholder}
            <IoMdArrowDropup size={18} className={`text-gray-400 ${!isShow && 'hidden'}`} />
            <IoMdArrowDropdown size={18} className={`text-gray-400 ${isShow && 'hidden'}`} />
        </button>
        <div className={`absolute shadow-lg py-2 top-[65px] right-0 left-0 bg-white rounded-md transition-all duration-200
            ${isShow ? 'visible opacity-100 translate-y-0' : `invisible opacity-0 -translate-y-3`} 
            border border-gray-100 border-solid z-50`}>
            {
                props.data?.map((item: any, index: number) => (
                    <button key={index} onClick={() => {
                        props.onChange({ target: { name: props.name, value: item?.id } });
                        setIsShow(false);
                    }} className={`w-full flex items-center text-[13px] px-5 py-[10px] gap-3 hover:bg-green-50
                                hover:text-green-500 ${item.id === props.value ? 'text-green-500' : 'text-gray-800'}`}>
                        {item?.name}
                    </button>
                ))
            }
        </div>
    </div>
}

export const ColorInput = (props: IAppInput) => {
    const [isFocus, setIsFocus] = useState(false);
    return <div className={`${props.width ? props.width : 'w-full'} mb-4`}>
        <div className='text-[13px] text-gray-600 mb-[3px]'>{props.label}</div>
        <div className={`${'flex items-center rounded border border-solid'} ${isFocus ? 'border-teal-500' : props.error ? 'border-red-500' : 'border-gray-200'}`}>
            <input
                name={props.name}
                type='color'
                value={props.value ?? ''}
                onChange={props.onChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
            <input
                name={props.name}
                placeholder={props.placeholder}
                className='w-full rounded text-[13px] px-2.5 py-[8px]'
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type={props.type ? props.type : 'text'}
                value={props.value ?? ''}
                onChange={props.onChange}
                autoComplete='off'
            />
            {
                props.error && <IoIosWarning size={20} color={'red'} style={{ marginRight: 16 }} />
            }
        </div>
    </div>
}