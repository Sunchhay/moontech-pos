import SideBarLink from './SideBarLink';
import { MdAnalytics, MdDashboard, MdHelpCenter, MdLogout, MdOutlineCategory, MdOutlineSettings, MdPeople, MdShoppingBag, MdSupervisedUserCircle, MdWork } from 'react-icons/md';
import { FaClipboardList, FaUser } from 'react-icons/fa';
import { AppImages } from '../../utils/lib/images';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../utils/lib/routeName';
import useAuth from '../../utils/hook/useAuth';
import SideBarLinkDropDown from './SideBarLinkDropDown';
import { TbBrandEnvato } from "react-icons/tb";
import { GiResize } from "react-icons/gi";
import { IoColorPaletteOutline } from 'react-icons/io5';
import { HiColorSwatch } from 'react-icons/hi';
import { IoIosPricetags } from 'react-icons/io';

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
            title: "Sizes",
            path: RouteName.Sizes,
            icon: <GiResize />,
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
      {
        title: "Reservation",
        path: RouteName.Reservation,
        icon: <FaClipboardList />,
      },
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
  return (
    <div className='scrollbar-hide fixed overflow-y-auto h-screen w-[280px] px-4 pb-10 bg-white shadow-sm max-sm:hidden'>
      <img src={AppImages.LogoIcon} alt='' style={{ height: 90 }} className='mx-auto my-3' />
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
            Cookies.remove('token');
            navigate(RouteName.Login, { replace: true });
          }} className={`w-full flex items-center gap-3 py-3 px-3 rounded-md text-gray-600 hover:bg-green-500 hover:text-white`}>
            <div className='w-5 flex items-center justify-center'><MdLogout /></div>
            <div className='text-sm'>{'Logout'}</div>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar