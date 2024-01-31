interface Props {
    children?: React.ReactNode;
}

const TableHeader = ({ children }: Props) => {
    return (
        <div className='w-full flex items-center h-12 bg-gray-50 font-semibold text-gray-500 rounded px-5'>
            {children}
        </div>
    )
}

export default TableHeader