import { useState } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { PiSquaresFourLight } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { IoMdTrash } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { ActionButton, AddNewButton, FilterButton, IconButton, IconDropDown } from '../../components/custom/AppButton';
import { AppImages } from '../../utils/lib/images';
import Pagination from '../../components/table/Pagination';
import ProductModal from '../../components/modal/admin/ProductModal';
import { useAppDispatch } from '../../utils/hook/useRedux';
import ProductTable from '../../components/table/ProductTable';

const colData = ['Category', 'Price', 'Total Sales', 'Status'];

interface IProduct {
  category_id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  qty: number;
  discount: number;
  disount_type: string;
  status: number;
}

const Product = () => {
  const dispatch = useAppDispatch();
  const [isRow, setIsRow] = useState<any>(true);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [state, setState] = useState<IProduct>();
  const [tableSelect, setTableSelect] = useState(['Category', 'Price', 'Total Sales', 'Status']);

  const handleChange = (e: any) => {
    setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleSelectProfile = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setState((prevState: any) => ({ ...prevState, image: imageUrl }));
    }
    reader.readAsDataURL(image);
  }

  const onSelect = (item: any) => {
    if (tableSelect?.includes(item)) {
      let data = tableSelect?.filter((value: any) => value !== item);
      setTableSelect([...data]);
    } else {
      setTableSelect(prev => [...prev, item]);
    }
  }

  return (
    <Layout title={'Products'}>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search product...'} />
          <div className='flex items-center'>
            <FilterButton />
            <AddNewButton onClick={() => { setIsOpen(true) }} />
            <IconButton isActive={!isRow} onClick={() => setIsRow(false)} icon={<PiSquaresFourLight size={22} />} />
            <IconButton isActive={isRow} onClick={() => setIsRow(true)} icon={<FaList size={17} />} />
            <IconDropDown
              icon={<BsThreeDots size={22} />}
              data={colData}
              selected={tableSelect}
              onSelect={onSelect}
            />
          </div>
        </div>
        {
          isRow ? (
            <ProductTable data={[...Array(10)]} />
            // <table className='w-full mt-4 text-sm max-sm:text-xs'>
            //   <thead className='font-semibold text-gray-500 bg-gray-50'>
            //     <tr>
            //       <td className='w-[70px] text-center'>#</td>
            //       <td className='px-1'>Product Name</td>
            //       {tableSelect?.includes('Category') && <td>Category</td>}
            //       {tableSelect?.includes('Price') && <td>Price</td>}
            //       {tableSelect?.includes('Status') && <td className='text-center'>Status</td>}
            //       {tableSelect?.includes('Total Sales') && <td className='text-right'>Total Sales</td>}
            //       <td className='h-[45px] flex justify-center items-center'>Action</td>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {
            //       [...Array(10)].map((value: any, index: any) => (
            //         <tr onClick={() => { }} key={index} className='transition-all duration-200 hover:bg-green-50'>
            //           <td className='w-[70px] text-gray-500 text-center'>{index + 1}</td>
            //           <td className='h-[50px] flex items-center gap-3 px-1'>
            //             <img src={AppImages.Product} alt='' style={{ objectFit: 'cover', width: 35, height: 28, borderRadius: 3 }} />
            //             <div>Double Cheese Burger</div>
            //           </td>
            //           {tableSelect?.includes('Category') && <td>Food</td>}
            //           {tableSelect?.includes('Price') && <td>$12.50</td>}
            //           {tableSelect?.includes('Status') && <td className='text-center'>
            //             <div className='h-[50px] flex justify-center items-center'>
            //               <GoDotFill className={`${false ? 'text-green-500' : 'text-gray-300'}`} />
            //             </div>
            //           </td>}
            //           {tableSelect?.includes('Total Sales') && <td className='text-right'>$1250.00</td>}
            //           <td>
            //             <div className='h-[50px] px-1.5 flex justify-center items-center'>
            //               <ActionButton
            //                 icon={<BsThreeDotsVertical size={18} className='text-gray-500' />}
            //                 onEdit={() => { }}
            //                 onActive={() => { }}
            //                 onDelete={() => { }}
            //                 onPrint={() => { }}
            //                 isLast={index === 9}
            //               />
            //             </div>
            //           </td>
            //         </tr>
            //       ))
            //     }
            //   </tbody>
            // </table>
          ) : (
            <>
              <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 pt-4 pb-[5.5px] px-1 sm:px-2'>
                {
                  [...Array(10)].map((item: any, index: number) => (
                    <div key={index} className='border border-solid border-gray-200 rounded-md p-3'>
                      <img src={AppImages.Product} alt='' style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: 3 }} />
                      <div className='text-sm mt-[10px]'>Double Cheese Burger</div>
                      <div className='text-sm mt-[5px]'>$12.50</div>
                      <div className='flex items-center gap-2 mt-[14px]'>
                        <button onClick={() => { }} className={`w-2/4 flex justify-center items-center text-[13px] text-gray-500 py-1.5 gap-1 sm:gap-3 border border-gray-200 rounded-[4px] hover:border-gray-400`}>
                          <MdModeEdit size={15} />
                          <span>{'Edit'}</span>
                        </button>
                        <button onClick={() => { }} className={`w-2/4 flex justify-center items-center text-[13px] text-red-500 py-1.5 gap-1 sm:gap-3 border border-gray-200 rounded-[4px] hover:border-red-500`}>
                          <IoMdTrash size={15} />
                          <span>{'Delete'}</span>
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          )
        }
        <Pagination />
      </div>
      {
        isOpen && <ProductModal
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      }
    </Layout>
  )
}

export default Product