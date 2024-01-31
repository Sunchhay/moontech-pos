import { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { AddNewButton, AppDropDownButton } from '../../components/custom/AppButton';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import DeleteDialog from '../../components/modal/dialog/DeleteDialog';
import axios, { ApiManager } from '../../utils/lib/axios';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import Pagination from '../../components/table/Pagination';
import { getCustomer, getCustomerSuccess } from '../../redux/actions/customer.action';
import CustomerTable from '../../components/table/CustomerTable';
import CustomerModal, { ICustomer } from '../../components/modal/admin/CustomerModal';
import CustomerProfileModal from '../../components/modal/admin/CustomerProfileModal';

const Customer = () => {
  const dispatch = useAppDispatch();
  const customerState = useAppSelector(state => state.customer);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isProfile, setIsProfile] = useState<any>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<any>();
  const [status, setStatus] = useState<any>({ id: null, name: 'All' });
  const [state, setState] = useState<ICustomer>({ status: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCustomer({ page: currentPage }));
  }, [currentPage]);

  const handlePost = () => {
    const formdata = new FormData();
    state?.id && formdata.append('id', state?.id);
    formdata.append('name', state?.name);
    formdata.append('gender', state?.gender);
    formdata.append('phone', state?.phone);
    formdata.append('address', state?.address);
    formdata.append('image', state?.imageUrl ? state?.imageUrl : state?.image);
    formdata.append('status', state?.status);

    axios.post(state?.id ? 'customer/update' : 'customer/create', formdata).then((response: any) => {
      if (response?.data?.message === true) {
        dispatch(getCustomerSuccess(response?.data));
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
      ApiManager.POST('customer/delete', { id: state?.id }).then((response: any) => {
        if (response?.message === true) {
          dispatch(getCustomerSuccess(response));
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
    ApiManager.POST('customer/update', { id: item?.id, status: item?.status === 1 ? 0 : 1 }).then((response: any) => {
      if (response?.message === true) {
        dispatch(getCustomerSuccess(response));
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
    dispatch(getCustomer({ page: currentPage, keyword: e.target.value }));
  }

  return (
    <Layout title='Customers'>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search customer...'} value={search} onChange={handleSearch} />
          <div className='flex items-center'>
            {/* <FilterButton /> */}
            <AppDropDownButton
              placeholder={'Status'}
              data={[{ id: null, name: 'All' }, { id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]}
              value={status}
              onChange={(value: any) => {
                setStatus(value);
                dispatch(getCustomer({ page: currentPage, keyword: search, status: value?.id }));
              }}
            />
            <AddNewButton onClick={() => {
              setIsOpen(true);
              setState({ status: 1, name: '', image: '', imageUrl: '' });
            }} />
          </div>
        </div>
        <CustomerTable
          data={customerState?.data}
          onActive={handleUpdateStatus}
          onDoubleClick={(item: any) => {
            setState(item);
            setIsProfile(true);
          }}
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
          customerState?.data?.length > 0 ? <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={customerState?.paginate?.totalPages}
          /> : <div className='h-[58px]' />
        }
      </div>
      <CustomerProfileModal
        state={state}
        isOpen={isProfile}
        handleClose={() => setIsProfile(false)}
      />
      <CustomerModal
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

export default Customer