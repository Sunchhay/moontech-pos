import { useEffect, useState } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { PiSquaresFourLight } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { IoMdTrash } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { ActionButton, AddNewButton, AppDropDownButton, FilterButton, IconButton, IconDropDown } from '../../components/custom/AppButton';
import { AppImages } from '../../utils/lib/images';
import Pagination from '../../components/table/Pagination';
import ProductModal from '../../components/modal/admin/ProductModal';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import ProductTable from '../../components/table/ProductTable';
import { getProduct } from '../../redux/actions/product.action';
import { ApiManager } from '../../utils/lib/axios';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import DeleteDialog from '../../components/modal/dialog/DeleteDialog';
import { ProductFilter } from '../../components/custom/ProductFilter';
import { formatter } from '../../utils/lib/format';

const colData = ['Category', 'Price', 'Total Sales', 'Status'];

interface IProduct {
  id?: any;
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
  const productState = useAppSelector(state => state.product);
  const [isRow, setIsRow] = useState<any>(true);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isDelete, setIsDelete] = useState<any>(false);
  const [state, setState] = useState<IProduct>();
  const [filter, setFilter] = useState({
    category: null,
    brand: null,
    status: null,
    color: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSelect, setTableSelect] = useState(['Category', 'Price', 'Total Sales', 'Status']);

  useEffect(() => {
    dispatch(getProduct({ page: 1 }));
  }, []);

  const onSelect = (item: any) => {
    if (tableSelect?.includes(item)) {
      let data = tableSelect?.filter((value: any) => value !== item);
      setTableSelect([...data]);
    } else {
      setTableSelect(prev => [...prev, item]);
    }
  }

  const handleUpdateStatus = (item: any) => {
    ApiManager.POST('product/updateStatus', { id: item?.id, status: item?.status === 1 ? 0 : 1 }).then((response: any) => {
      if (response?.message === true) {
        dispatch(getProduct({ page: 1 }));
        SuccessToast('Success', item?.name + ' has been ' + (item?.status === 1 ? 'deactivate' : 'activate') + ' successfully!');
      } else {
        ErrorToast('Error', 'Something went wrong, try again!');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleDelete = () => {
    setIsDelete(false);
    ApiManager.POST('product/delete', { id: state?.id }).then((response: any) => {
      if (response?.message === true) {
        dispatch(getProduct({ page: 1 }));
        SuccessToast('Success', state?.name + ' has been deleted successfully!');
      } else {
        ErrorToast('Error', 'Something went wrong, try again!');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Layout title={'Products'}>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search product...'} />
          <div className='flex items-center gap-2'>
            <ProductFilter
              placeholder={'Filter'}
              data={[{ id: null, name: 'All' }, { id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]}
              value={filter?.status}
              onChange={(value: any) => {
                // setStatus(value);
                // dispatch(getCategory({ page: currentPage, keyword: search, status: value?.id }));
              }}
            />
            <AddNewButton onClick={() => {
              setIsOpen(true);
              setState(undefined);
            }} />
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
            <ProductTable
              data={productState.data}
              onActive={handleUpdateStatus}
              onDelete={(item: any) => {
                setState(item);
                setIsDelete(true);
              }}
              onEdit={(item: any) => {
                setState(item);
                setIsOpen(true);
              }}
            />
          ) : (
            <>
              <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 pt-4 pb-[5.5px] px-1 sm:px-2'>
                {
                  productState?.data?.length > 0 && productState.data.map((item: any, index: number) => (
                    <div key={index} className='border border-solid border-gray-200 rounded-md p-3'>
                      <img src={item?.image ?? AppImages.Product} alt='' style={{ objectFit: 'cover', width: '100%', height: 160, borderRadius: 3 }} />
                      <div className='text-[13px] mt-[10px] flex items-center'>
                        {item?.name}
                        {
                          item?.color?.code && <div className='w-[12px] h-[12px] rounded-full ml-1.5' style={{ backgroundColor: item?.color?.code }}></div>
                        }
                      </div>
                      <div className='text-[12px] text-gray-600'>
                        {item?.brand?.name} - {item?.category?.name}
                      </div>
                      <div className='text-[13px] mt-[5px] text-black'>{formatter.format(item?.sale_price)}</div>
                      <div className='flex items-center gap-2 mt-[14px]'>
                        <button onClick={() => {
                          setState(item);
                          setIsOpen(true);
                        }} className={`w-2/4 flex justify-center items-center text-[13px] text-gray-500 py-1.5 gap-1 sm:gap-3 border border-gray-200 rounded-[4px] hover:border-gray-400`}>
                          <MdModeEdit size={15} />
                          <span>{'Edit'}</span>
                        </button>
                        <button onClick={() => {
                          setState(item);
                          setIsDelete(true);
                        }} className={`w-2/4 flex justify-center items-center text-[13px] text-red-500 py-1.5 gap-1 sm:gap-3 border border-gray-200 rounded-[4px] hover:border-red-500`}>
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
        {
          productState?.data?.length > 0 ? <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={productState?.paginate?.totalPages}
          /> : <div className='h-[58px]' />
        }
      </div>
      {
        isOpen && <ProductModal
          data={state}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      }
      {
        isDelete && <DeleteDialog
          title={state?.name}
          isOpen={isDelete}
          handleDelete={handleDelete}
          handleClose={() => setIsDelete(false)}
        />
      }
    </Layout>
  )
}

export default Product