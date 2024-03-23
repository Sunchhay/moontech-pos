interface Props {
  children?: React.ReactNode;
}

const TableBody = ({ children }: Props) => {
  return (
    <div className="pt-1 h-full overflow-y-auto scrollbar-hide">
      {children}
    </div>
  )
}

export default TableBody