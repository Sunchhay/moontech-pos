import { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { AddNewButton, AppDropDownButton, FilterButton } from '../../components/custom/AppButton';
import BrandModal, { IBrand } from '../../components/modal/admin/BrandModal';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import { getBrand, getBrandSuccess } from '../../redux/actions/brand.action';
import DeleteDialog from '../../components/modal/dialog/DeleteDialog';
import axios, { ApiManager } from '../../utils/lib/axios';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import Pagination from '../../components/table/Pagination';
import BrandTable from '../../components/table/BrandTable';

const Brand = () => {
  const dispatch = useAppDispatch();
  const brandState = useAppSelector(state => state.brand);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<any>();
  const [status, setStatus] = useState<any>({ id: null, name: 'All' });
  const [state, setState] = useState<IBrand>({ status: 1, name: '', image: '', imageUrl: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getBrand({ page: currentPage }));
  }, [currentPage]);

  const handlePost = () => {
    const formdata = new FormData();
    state?.id && formdata.append('id', state?.id);
    formdata.append('name', state?.name);
    formdata.append('image', state?.imageUrl ? state?.imageUrl : state?.image);
    formdata.append('status', state?.status);

    axios.post(state?.id ? 'brand/update' : 'brand/create', formdata).then((response: any) => {
      if (response?.data?.message === true) {
        dispatch(getBrandSuccess(response?.data));
        SuccessToast('Success', state?.name + ' has been saved successfully!');
      } else {
        ErrorToast('Error', 'Something went wrong, try again!');
      }
      setIsOpen(false);
    }).catch((err) => {
      console.log(err);
      ErrorToast('Error', 'Something went wrong, try again!');
    })
  }

  const handleDelete = () => {
    if (state?.id) {
      ApiManager.POST('brand/delete', { id: state?.id }).then((response: any) => {
        if (response?.message === true) {
          dispatch(getBrandSuccess(response));
          SuccessToast('Success', state?.name + ' has been deleted successfully!');
        } else {
          ErrorToast('Error', 'Something went wrong, try again!');
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    setIsShowDelete(false);
  }

  const handleUpdateStatus = (item: any) => {
    ApiManager.POST('brand/update', { id: item?.id, status: item?.status === 1 ? 0 : 1 }).then((response: any) => {
      if (response?.message === true) {
        dispatch(getBrandSuccess(response));
        SuccessToast('Success', item?.name + ' has been ' + (item?.status === 1 ? 'deactivate' : 'activate') + ' successfully!');
      } else {
        ErrorToast('Error', 'Something went wrong, try again!');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    dispatch(getBrand({ page: currentPage, keyword: e.target.value }));
  }

  return (
    <Layout title='Brands'>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search...'} value={search} onChange={handleSearch} />
          <div className='flex items-center'>
            <AppDropDownButton
              placeholder={'Status'}
              data={[{ id: null, name: 'All' }, { id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]}
              value={status}
              onChange={(value: any) => {
                setStatus(value);
                dispatch(getBrand({ page: currentPage, keyword: search, status: value?.id }));
              }}
            />
            <AddNewButton onClick={() => {
              setIsOpen(true);
              setState({ status: 1, name: '', image: '', imageUrl: '' });
            }} />
          </div>
        </div>
        <BrandTable
          data={brandState?.data}
          onActive={handleUpdateStatus}
          onDelete={(item: any) => {
            setState(item);
            setIsShowDelete(true);
          }}
          onEdit={(item: any) => {
            setState(item);
            setIsOpen(true);
          }}
        />
        {
          brandState?.data?.length > 0 ? <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={brandState?.paginate?.totalPages}
          /> : <div className='h-[58px]' />
        }
      </div>
      <BrandModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSubmit={handlePost}
        state={state}
        setState={setState}
      />
      <DeleteDialog
        isOpen={isShowDelete}
        handleClose={() => setIsShowDelete(false)}
        handleDelete={handleDelete}
        title={state?.name}
      />
    </Layout>
  )
}

export default Brand