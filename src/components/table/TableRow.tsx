interface Props {
    children?: React.ReactNode;
}

const TableRow = ({ children }: Props) => {
    return (
        <div className='h-[50px] w-full flex items-center text-gray-700 bg-white rounded px-5 hover:bg-green-50'>
            {children}
        </div>
    )
}

export default TableRow