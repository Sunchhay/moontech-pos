import SideBarLink from './SideBarLink';
import { MdAnalytics, MdAttachMoney, MdDashboard, MdHelpCenter, MdLogout, MdOutlineSettings, MdPeople, MdShoppingBag, MdSupervisedUserCircle, MdWork } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { AppImages } from '../../lib/images';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../lib/routeName';
import useAuth from '../../hook/useAuth';
import SideBarLinkDropDown from './SideBarLinkDropDown';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Products",
        path: "/admin/products",
        icon: <MdShoppingBag />,
        list: [
          {
            title: "Brands",
            path: "/admin/users",
            icon: <MdSupervisedUserCircle />,
          },
          {
            title: "Categories",
            path: "/admin/users",
            icon: <MdSupervisedUserCircle />,
          },
          {
            title: "Size",
            path: "/admin/users",
            icon: <MdSupervisedUserCircle />,
          },
          {
            title: "Color",
            path: "/admin/users",
            icon: <MdSupervisedUserCircle />,
          },
        ]
      },
    ]
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/admin/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/admin/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/admin/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: "Profile",
        path: "/admin/profile",
        icon: <FaUser size={14} />,
      },
      {
        title: "Settings",
        path: "/admin/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/admin/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return (
    <div className='fixed h-screen w-[280px] px-4 bg-white shadow-sm max-sm:hidden'>
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