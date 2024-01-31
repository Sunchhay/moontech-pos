import SideBarLink from './SideBarLink';
import { MdAnalytics, MdDashboard, MdHelpCenter, MdLogout, MdOutlineCategory, MdOutlineSettings, MdPeople, MdShoppingBag, MdSupervisedUserCircle, MdWork } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { AppImages } from '../../utils/lib/images';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../utils/lib/routeName';
import useAuth from '../../utils/hook/useAuth';
import SideBarLinkDropDown from './SideBarLinkDropDown';
import { TbBrandEnvato } from "react-icons/tb";
import { IoClose, IoColorPaletteOutline } from 'react-icons/io5';
import { HiColorSwatch } from 'react-icons/hi';
import { IoIosPricetags } from 'react-icons/io';
import { PiOptionBold } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import { getProfileSuccess } from '../../redux/actions/profile.action';
import { handleSideBar } from '../../redux/actions/index.action';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: "Dashboard",
        path: RouteName.Dashboard,
        icon: <MdDashboard />,
      },
      {
        title: "Variations",
        path: "variations",
        icon: <HiColorSwatch />,
        list: [
          {
            title: "Brands",
            path: RouteName.Brands,
            icon: <TbBrandEnvato />,
          },
          {
            title: "Categories",
            path: RouteName.Categories,
            icon: <MdOutlineCategory />,
          },
          {
            title: "Attributes",
            path: RouteName.Attributes,
            icon: <PiOptionBold />,
          },
          {
            title: "Colors",
            path: RouteName.Colors,
            icon: <IoColorPaletteOutline />,
          },
        ]
      },
      {
        title: "Products",
        path: RouteName.Products,
        icon: <MdShoppingBag />,
      },
      {
        title: "Customer",
        path: RouteName.Customers,
        icon: <MdSupervisedUserCircle />,
      },
      // {
      //   title: "Reservation",
      //   path: RouteName.Reservation,
      //   icon: <FaClipboardList />,
      // },
      {
        title: "POS Sales",
        path: RouteName.Sales,
        icon: <IoIosPricetags />
      },
    ]
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: RouteName.Revenue,
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: RouteName.Reports,
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: RouteName.Teams,
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: "Profile",
        path: RouteName.Profile,
        icon: <FaUser size={14} />,
      },
      {
        title: "Settings",
        path: RouteName.Settings,
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: RouteName.Help,
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const dispatch = useAppDispatch();
  const isShow = useAppSelector(state => state.sideBar);
  return (
    <>
      <div className={`scrollbar-hide absolute left-0 right-0 sm:fixed z-[999] overflow-y-auto h-screen w-[280px] px-4 pb-20 bg-white shadow-sm transition-all duration-500 transform ${isShow ? 'translate-x-0' : 'translate-x-[-280px]'} `}>
        <img src={AppImages.LogoIcon} alt='' style={{ height: 90 }} className='mx-auto my-3' />
        <button onClick={() => dispatch(handleSideBar(!isShow))} className='absolute top-3 right-3 p-2 hover:bg-gray-50 rounded-full sm:hidden'><IoClose size={24} /></button>
        <ul>
          {
            menuItems.map((cat: any, index: any) => {
              return <li key={index}>
                <div className='my-1 text-sm font-semibold text-gray-600'>{cat.title}</div>
                {
                  cat.list.map((item: any, index: number) => (
                    item?.list ? <SideBarLinkDropDown key={index} item={item} /> :
                      <SideBarLink key={index} item={item} />
                  ))
                }
              </li>
            })
          }
          <li>
            <button onClick={() => {
              setAuth({});
              localStorage.removeItem('token');
              dispatch(getProfileSuccess({}));
              navigate(RouteName.Login, { replace: true });
            }} className={`w-full flex items-center gap-3 py-3 px-3 rounded-md text-gray-600 hover:bg-green-500 hover:text-white`}>
              <div className='w-5 flex items-center justify-center'><MdLogout /></div>
              <div className='text-sm'>{'Logout'}</div>
            </button>
          </li>
        </ul>
      </div>
      <button onClick={() => dispatch(handleSideBar(!isShow))} className={`transition-all duration-200 ${isShow ? 'visible opacity-100' : 'invisible opacity-0'} absolute z-[998] w-full h-screen bg-[rgba(0,0,0,0.3)] sm:hidden`}></button>
    </>
  )
}

export default Sidebar