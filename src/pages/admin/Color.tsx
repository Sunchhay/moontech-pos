import { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { AddNewButton, AppDropDownButton } from '../../components/custom/AppButton';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import DeleteDialog from '../../components/modal/dialog/DeleteDialog';
import axios, { ApiManager } from '../../utils/lib/axios';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import Pagination from '../../components/table/Pagination';
import ColorTable from '../../components/table/ColorTable';
import ColorModal, { IColor } from '../../components/modal/admin/ColorModal';
import { getColor, getColorSuccess } from '../../redux/actions/color.action';

const Color = () => {
  const dispatch = useAppDispatch();
  const colorState = useAppSelector(state => state.color);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<any>();
  const [status, setStatus] = useState<any>({ id: null, name: 'All' });
  const [state, setState] = useState<IColor>({ name: '', code: '', status: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getColor({ page: currentPage }));
  }, [currentPage]);

  const handlePost = () => {
    ApiManager.POST(state?.id ? 'color/update' : 'color/create', state).then((response: any) => {
      if (response?.message === true) {
        dispatch(getColorSuccess(response));
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
      ApiManager.POST('color/delete', { id: state?.id }).then((response: any) => {
        if (response?.message === true) {
          dispatch(getColorSuccess(response));
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
    ApiManager.POST('color/update', { id: item?.id, status: item?.status === 1 ? 0 : 1 }).then((response: any) => {
      if (response?.message === true) {
        dispatch(getColorSuccess(response));
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
    dispatch(getColor({ page: currentPage, keyword: e.target.value }));
  }


  return (
    <Layout title='Colors'>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search category...'} value={search} onChange={handleSearch} />
          <div className='flex items-center'>
            <AppDropDownButton
              placeholder={'Status'}
              data={[{ id: null, name: 'All' }, { id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]}
              value={status}
              onChange={(value: any) => {
                setStatus(value);
                dispatch(getColor({ page: currentPage, keyword: search, status: value?.id }));
              }}
            />
            <AddNewButton onClick={() => {
              setIsOpen(true);
              setState({ status: 1, name: '', code: '', id: '' });
            }} />
          </div>
        </div>
        <ColorTable
          data={colorState?.data}
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
          colorState?.data?.length > 0 ? <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={colorState?.paginate?.totalPages}
          /> : <div className='h-[58px]' />
        }
      </div>
      <ColorModal
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

export default Color