import { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { AddNewButton, AppDropDownButton } from '../../components/custom/AppButton';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import DeleteDialog from '../../components/modal/dialog/DeleteDialog';
import axios, { ApiManager } from '../../utils/lib/api';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import Pagination from '../../components/table/Pagination';
import CategoryTable from '../../components/table/CategoryTable';
import CategoryModal, { ICategory } from '../../components/modal/admin/CategoryModal';
import { getCategory, getCategorySuccess } from '../../redux/actions/category.action';

const Category = () => {
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector(state => state.category);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<any>();
  const [status, setStatus] = useState<any>({ id: null, name: 'All' });
  const [state, setState] = useState<ICategory>({ status: 1, name: '', image: '', imageUrl: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCategory({ page: currentPage }));
  }, [currentPage]);

  const handlePost = () => {
    const formdata = new FormData();
    state?.id && formdata.append('id', state?.id);
    formdata.append('name', state?.name);
    formdata.append('image', state?.imageUrl ? state?.imageUrl : state?.image);
    formdata.append('status', state?.status);

    axios.post(state?.id ? 'category/update' : 'category/create', formdata).then((response: any) => {
      if (response?.data?.message === true) {
        dispatch(getCategorySuccess(response?.data));
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
      ApiManager.POST('category/delete', { id: state?.id }).then((response: any) => {
        if (response?.message === true) {
          dispatch(getCategorySuccess(response));
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
    ApiManager.POST('category/update', { id: item?.id, status: item?.status === 1 ? 0 : 1 }).then((response: any) => {
      if (response?.message === true) {
        dispatch(getCategorySuccess(response));
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
    dispatch(getCategory({ page: currentPage, keyword: e.target.value }));
  }

  return (
    <Layout title='Categories'>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search category...'} value={search} onChange={handleSearch} />
          <div className='flex items-center'>
            {/* <FilterButton /> */}
            <AppDropDownButton
              placeholder={'Status'}
              data={[{ id: null, name: 'All' }, { id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]}
              value={status}
              onChange={(value: any) => {
                setStatus(value);
                dispatch(getCategory({ page: currentPage, keyword: search, status: value?.id }));
              }}
            />
            <AddNewButton onClick={() => {
              setIsOpen(true);
              setState({ status: 1, name: '', image: '', imageUrl: '' });
            }} />
          </div>
        </div>
        <CategoryTable
          data={categoryState?.data}
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
          categoryState?.data?.length > 0 ? <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={categoryState?.paginate?.totalPages}
          /> : <div className='h-[58px]' />
        }
      </div>
      <CategoryModal
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

export default Category