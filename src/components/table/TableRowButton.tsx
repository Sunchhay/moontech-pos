interface Props {
    children?: React.ReactNode;
    onDoubleClick: any;
}

const TableRowButton = ({ children, onDoubleClick }: Props) => {
    return (
        <button onDoubleClick={onDoubleClick} className='h-[50px] w-full flex items-center text-gray-700 bg-white rounded px-5 hover:bg-green-50'>
            {children}
        </button>
    )
}

export default TableRowButton