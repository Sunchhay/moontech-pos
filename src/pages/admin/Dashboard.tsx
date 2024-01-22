import { MdSupervisedUserCircle } from 'react-icons/md';
import { BiSolidCircleThreeQuarter, BiSolidDollarCircle } from "react-icons/bi";
import Layout from '../../components/admin/Layout';
import CardDashboard from '../../components/card/CardDashboard';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppImages } from '../../utils/lib/images';
import OrderPieChart from '../../components/dashboard/OrderPieChart';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

export const cards = [
  {
    id: 1,
    title: "Customers",
    number: 10.928,
    change: 12,
    icon: <MdSupervisedUserCircle size={26} className='text-blue-600' />
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
    icon: <BiSolidCircleThreeQuarter size={26} className='text-pink-500' />
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
    icon: <BiSolidDollarCircle size={26} className='text-green-500' />
  },
];


const data = [
  {
    name: "Sun",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2000,
    click: 3800,
  },
  {
    name: "Wed",
    visit: 2780,
    click: 3908,
  },
  {
    name: "Thu",
    visit: 1890,
    click: 4800,
  },
  {
    name: "Fri",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Sat",
    visit: 3490,
    click: 4300,
  },
];


const Dashboard = () => {

  return (
    <Layout title='Dashboard'>
      <div className='flex gap-3'>
        <div className='w-full'>
          <div className='flex items-center gap-3 pt-3'>
            {
              cards.map((item: any, index: any) => {
                return <CardDashboard key={index} item={item} />
              })
            }
          </div>
          <div className='bg-white rounded-md p-5 my-3 shadow-sm'>
            <h2 className='text-md font-semibold mb-3'>Last Transactions</h2>
            <table className='w-full text-left text-[13px]'>
              <thead className='text-gray-500 font-semibold'>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className='text-gray-800'>
                {
                  [...Array(5)].map(() => (
                    <tr>
                      <td className='flex items-center gap-2 py-2'>
                        <img src={AppImages.Profile} alt='' className='w-7 h-7 rounded-full' />
                        <div>Sunchhay</div>
                      </td>
                      <td>
                        <span className='bg-yellow-400 text-white text-[13px] py-1 px-2 rounded'>Pending</span>
                      </td>
                      <td>01-02-2024</td>
                      <td>$20.09</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='w-[400px]'>
          <div className='relative bg-white rounded-md p-5 pb-9 my-3 shadow-sm overflow-hidden'>
            <h2 className='text-md font-semibold'>Order Statistics</h2>
            <div className='flex items-center justify-between -mt-4'>
              <div>
                <div className='text-2xl'>8,234</div>
                <div className='text-xs mt-1 text-gray-500'>Total Orders</div>
              </div>
              <OrderPieChart />
            </div>
            {
              [...Array(5)].map(() => {
                return <div className='w-full flex justify-between items-center text-[13px] py-2'>
                  <div className='flex items-center gap-2.5'>
                    <img src={AppImages.Product} alt='' className='rounded w-7 h-7' />
                    <div>Double Cheese Burger</div>
                  </div>
                  <div>200</div>
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className='flex gap-3'>
        <div className='h-[350px] bg-white rounded-md p-2 mb-3 shadow-sm'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar defaultValue={dayjs(new Date())} />
          </LocalizationProvider>
        </div>
        <div className='w-full h-[350px] bg-white rounded-md p-5 mb-3 shadow-sm'>
          <h2 className='text-md font-semibold mb-5'>Weekly Recap</h2>
          <ResponsiveContainer width="100%" height="90%" className={'text-xs'}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#fff", borderRadius: 5, borderColor: '#f0f0f0' }} />
              <Legend />
              <Line type="monotone" dataKey="visit" stroke="#8884d8" />
              <Line type="monotone" dataKey="click" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </Layout>
  )
}

export default Dashboard