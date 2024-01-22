import Layout from "../../components/admin/Layout"
import CardSummary from "../../components/card/CardSummary"
import { AppImages } from "../../utils/lib/images"
import CardReservation from "../../components/card/CardReservation";
import Pagination from "../../components/table/Pagination";
import { SearchInput } from "../../components/custom/AppInput";
import { FilterButton } from "../../components/custom/AppButton";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosPricetags } from "react-icons/io";

const Sale = () => {
  return (
    <Layout title='POS Sales'>
      <div className="flex gap-3">
        <div className="w-full">
          <div className='flex items-center gap-3 pt-3'>
            <CardSummary item={{
              icon: <IoIosPricetags size={22} className='text-blue-600' />,
              title: 'Total Sales',
              number: 124
            }} />
            <CardSummary item={{
              icon: <PiClockCountdownFill size={25} className='text-pink-500' />,
              title: 'Pending',
              number: 19
            }} />
            <CardSummary item={{
              icon: <FaMoneyCheckDollar size={22} className='text-green-500' />,
              title: 'Success',
              number: 95
            }} />
          </div>
          <div className='bg-white rounded-md p-5 my-3 shadow-sm'>
            <div className='w-full flex justify-between items-center mb-3'>
              <SearchInput placeholder={'Search...'} />
              <FilterButton />
            </div>
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
                  [...Array(10)].map(() => (
                    <tr>
                      <td className='flex items-center gap-2 py-2'>
                        <img src={AppImages.Profile} alt="" className='w-7 h-7 rounded-full' />
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
            <Pagination />
          </div>
        </div>
        <div className="w-[500px] bg-white rounded-md p-5 my-3 shadow-sm relative text-[13px]">
          <div className='font-semibold text-lg mb-2 mt-1'>Order Details</div>
          <div className='mb-1.5'>{`${'Table: A05'}`}</div>
          <div className='text-gray-400 mb-1.5'>{`${'Date: 15/01/24, 2:30PM'}`}</div>
          <div className='text-gray-400 mb-3.5'>{`${'No: #0000001'}`}</div>
          <div className='h-[1px] w-full bg-gray-200'></div>
          <div className=''>
            {
              [...Array(10)].map((value, index) => (
                <CardReservation key={index} />
              ))
            }
          </div>
          <div className='h-[1px] w-full bg-gray-200 mb-4'></div>
          <div className='flex justify-between items-center mb-3'>
            <div className='text-gray-400'>Subtotal</div>
            <div>$102.32</div>
          </div>
          <div className='flex justify-between items-center mb-3'>
            <div className='text-gray-400'>VAT</div>
            <div>$10.23</div>
          </div>
          <div className='flex justify-between items-center mb-3'>
            <div className='text-gray-400'>Discount</div>
            <div>$0.00</div>
          </div>
          <div className='h-[1px] w-full bg-gray-200 mb-4'></div>
          <div className='flex justify-between items-center mb-3'>
            <div className='text-base font-semibold'>Total</div>
            <div className='text-base font-semibold'>$112.54</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Sale