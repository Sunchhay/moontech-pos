import { HTMLInputTypeAttribute, useCallback, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoCheckmarkSharp, IoSearch } from "react-icons/io5";

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

export const AppDropDown = (props: IDropdown) => {
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState('');
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

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const getPlaceholder = () => {
        let data = props.data?.find(item => props.value === item.id);
        return data ? data?.name : null;
    }

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
        if (props.data && props.data?.length > 0) {
            let newData = props.data.filter((item: any) => {
                return item?.name?.toLocaleLowerCase()?.search(e.target.value.toLocaleLowerCase()) > -1
            });
            setData(newData);
        }
        if (!e.target.value) {
            setData(props.data);
        }
    }

    return <div ref={containerRef} className={`relative ${props.width ? props.width : 'w-full'}  mb-4 text-[13px] `}>
        <div className='text-gray-600 mb-[3px]'>{props.label}</div>
        <button onClick={() => setIsShow(!isShow)} className={`${getPlaceholder() ? 'text-black' : 'text-gray-400'} ${'w-full px-3 py-[8px] flex justify-between items-center rounded border border-solid'} ${isShow ? 'border-teal-500' : 'border-gray-200'} bg-gray-50`}>
            {getPlaceholder() ?? props.placeholder}
            <IoMdArrowDropup size={18} className={`text-gray-400 ${!isShow && 'hidden'}`} />
            <IoMdArrowDropdown size={18} className={`text-gray-400 ${isShow && 'hidden'}`} />
        </button>
        <div className={`absolute shadow-lg px-2 pt-2 top-[65px] right-0 left-0 bg-white rounded-md transition-all duration-200
            ${isShow ? 'visible opacity-100 translate-y-0' : `invisible opacity-0 -translate-y-3`} 
            border border-gray-100 border-solid z-50 pb-2`}>
            <div className='flex items-center gap-2.5 px-2.5 pb-3 pt-2 mb-1.5 border-b border-b-gray-200'>
                <IoSearch className='text-gray-400' size={18} />
                <input
                    type='text'
                    placeholder={'Search...'}
                    value={search}
                    onChange={handleSearch}
                    className='w-full text-[13px] text-gray-800'
                />
            </div>
            <div className={`overflow-y-auto ${data?.length > 8 && 'pr-2'} max-h-60`}>
                {
                    data?.length > 0 ? data?.map((item: any, index: number) => (
                        <button key={index} onClick={() => {
                            props.onChange({ target: { name: props.name, value: item?.id } });
                            setIsShow(false);
                        }} className={`w-full flex items-center text-[13px] px-3 py-[8px] text-gray-800 gap-3 hover:bg-gray-50 rounded`}>
                            <div className="w-[14px] mr-1">
                                {item?.id === props.value && <IoCheckmarkSharp size={15} />}
                            </div>
                            {
                                item?.image && <img src={item?.image} className="shadow" style={{ width: 20, height: 20, borderRadius: 3, objectFit: 'cover' }} />
                            }

                            {item?.name}
                        </button>
                    )) : <div className="text-[13px] text-center py-3">No data found.</div>
                }
            </div>

        </div>
    </div>
}


export const ColorDropDown = (props: IDropdown) => {
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState('');
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

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const getPlaceholder = () => {
        let data = props.data?.find(item => props.value === item.id);
        return data ? data?.name : null;
    }

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
        if (props.data && props.data?.length > 0) {
            let newData = props.data.filter((item: any) => {
                return item?.name?.toLocaleLowerCase()?.search(e.target.value.toLocaleLowerCase()) > -1
            });
            setData(newData);
        }
        if (!e.target.value) {
            setData(props.data);
        }
    }

    return <div ref={containerRef} className={`relative ${props.width ? props.width : 'w-full'}  mb-4 text-[13px] `}>
        <div className='text-gray-600 mb-[3px]'>{props.label}</div>
        <button onClick={() => setIsShow(!isShow)} className={`${getPlaceholder() ? 'text-black' : 'text-gray-400'} ${'w-full px-3 py-[8px] flex justify-between items-center rounded border border-solid'} ${isShow ? 'border-teal-500' : 'border-gray-200'} bg-gray-50`}>
            {getPlaceholder() ?? props.placeholder}
            <IoMdArrowDropup size={18} className={`text-gray-400 ${!isShow && 'hidden'}`} />
            <IoMdArrowDropdown size={18} className={`text-gray-400 ${isShow && 'hidden'}`} />
        </button>
        <div className={`absolute shadow-lg px-2 pt-2 top-[65px] right-0 left-0 bg-white rounded-md transition-all duration-200
            ${isShow ? 'visible opacity-100 translate-y-0' : `invisible opacity-0 -translate-y-3`} 
            border border-gray-100 border-solid z-50 pb-2`}>
            <div className='flex items-center gap-2.5 px-2.5 pb-3 pt-2 mb-1.5 border-b border-b-gray-200'>
                <IoSearch className='text-gray-400' size={18} />
                <input
                    type='text'
                    placeholder={'Search...'}
                    value={search}
                    onChange={handleSearch}
                    className='w-full text-[13px] text-gray-800'
                />
            </div>
            <div className={`overflow-y-auto ${data?.length > 8 && 'pr-2'} max-h-60`}>
                {
                    data?.length > 0 ? data?.map((item: any, index: number) => (
                        <button key={index} onClick={() => {
                            props.onChange({ target: { name: props.name, value: item?.id } });
                            setIsShow(false);
                        }} className={`w-full flex items-center text-[13px] px-3 py-[8px] text-gray-800 gap-3 hover:bg-gray-50 rounded`}>
                            <div className="w-[14px] mr-1">
                                {item?.id === props.value && <IoCheckmarkSharp size={15} />}
                            </div>
                            <div style={{ backgroundColor: item?.code }} className={`w-4 h-4 rounded-full shadow`}></div>
                            {item?.name}
                        </button>
                    )) : <div className="text-[13px] text-center py-3">No data found.</div>
                }
            </div>

        </div>
    </div >
}
