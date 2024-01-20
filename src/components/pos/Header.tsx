import { AppImages } from '../../lib/images'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RouteName } from '../../lib/routeName'

const menu = [
  {
    name: 'Menu',
    path: '/menu'
  },
  {
    name: 'Reservation',
    path: '/reservation'
  },
  {
    name: 'Table',
    path: '/table'
  },
  {
    name: 'Customer',
    path: '/customer'
  }
]

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='fixed w-full h-[55px] px-5 flex justify-between items-center bg-white shadow-sm z-50'>
      <img src={AppImages.Logo} alt='' style={{ height: 16 }} />
      <div>
        {
          menu.map((item: any, index: number) => (
            <NavLink to={item.path} key={index} className={`py-4 px-5 text-sm border-b-4 border-solid
                         ${pathname === item.path ? 'text-green-500 border-b-green-500' : 'text-gray-400 border-b-transparent'}
                          hover:text-green-500`}>
              {item.name}
            </NavLink>
          ))
        }
      </div>
      <div className='w-[280px] flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <img src={AppImages.Profile} alt='' style={{ height: 34 }} className='rounded-full ring-[1.5px] ring-offset-2 ring-green-500' />
          <div>
            <div className='text-sm font-semibold'>Reaksmey Sunchhay</div>
            <div className='text-xs leading-4 text-gray-400'>Owner</div>
          </div>
        </div>
        <button onClick={() => { navigate(RouteName.Dashboard) }}>
          <img src={AppImages.SwapIcon} alt='' style={{ height: 34 }} />
        </button>
      </div>

    </div>
  )
}

export default Header