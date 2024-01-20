import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  item: any;
}

const SideBarLink = ({ item }: Props) => {
  let { pathname } = useLocation();
  return (
    <NavLink to={item.path} className={`flex items-center gap-3 py-3 px-3 rounded-md ${pathname === item.path ? 'bg-green-500 text-white' : 'text-gray-600'} hover:bg-green-500 hover:text-white`}>
      <div className='w-5 flex items-center justify-center'>{item.icon}</div>
      <div className='text-sm'>{item.title}</div>
    </NavLink>
  )
}

export default SideBarLink