import { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { AddNewButton, AppDropDownButton } from '../../components/custom/AppButton';
import { useAppDispatch, useAppSelector } from '../../utils/hook/useRedux';
import DeleteDialog from '../../components/modal/dialog/DeleteDialog';
import { ApiManager } from '../../utils/lib/api';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import Pagination from '../../components/table/Pagination';
import AttributeTable from '../../components/table/AttributeTable';
import { getAttribute, getAttributeSuccess } from '../../redux/actions/attribute.action';
import AttributeModal, { IAttribute } from '../../components/modal/admin/AttributeModal';

const Attribute = () => {
  const dispatch = useAppDispatch();
  const attributeState = useAppSelector(state => state.attribute);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<any>();
  const [status, setStatus] = useState<any>({ id: null, name: 'All' });
  const [attribute, setAttribute] = useState<any>();
  const [state, setState] = useState<IAttribute>({ name: '', status: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAttribute({ page: currentPage, keyword: search, status: status?.id, parent_id: attribute?.id }));
  }, [currentPage, attribute]);

  const handlePost = () => {
    ApiManager.POST((state?.id ? `attribute/update ` : `attribute/create`),
      { ...state, parent_id: attribute?.id }).then((response: any) => {
        if (response?.message === true) {
          dispatch(getAttributeSuccess(response));
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
      ApiManager.POST(
        `attribute/delete?page=${currentPage}&keyword=${search ?? ''}&status=${status?.id ?? ''}&parent_id=${attribute?.id ?? ''}`,
        { id: state?.id }
      ).then((response: any) => {
        if (response?.message === true) {
          dispatch(getAttributeSuccess(response));
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
    ApiManager.POST(
      `attribute/update?page=${currentPage}&keyword=${search ?? ''}&status=${status?.id ?? ''}&parent_id=${attribute?.id ?? ''}`,
      { id: item?.id, status: item?.status === 1 ? 0 : 1 }
    ).then((response: any) => {
      if (response?.message === true) {
        dispatch(getAttributeSuccess(response));
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
    dispatch(getAttribute({ page: currentPage, keyword: e.target.value }));
  }

  const onBack = () => {
    setAttribute(undefined);
  }

  return (
    <Layout title={attribute?.name ? `Attributes - ${attribute?.name}` : `Attributes`} enabledBack={attribute?.id} onBack={onBack}>
      <div className='w-full bg-white rounded-md shadow-sm p-4 my-3'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search...'} value={search} onChange={handleSearch} />
          <div className='flex items-center'>
            <AppDropDownButton
              placeholder={'Status'}
              data={[{ id: null, name: 'All' }, { id: 1, name: 'Active' }, { id: 0, name: 'Inactive' }]}
              value={status}
              onChange={(value: any) => {
                setStatus(value);
                dispatch(getAttribute({ page: currentPage, keyword: search, status: value?.id, parent_id: attribute?.id }));
              }}
            />
            <AddNewButton onClick={() => {
              setIsOpen(true);
              setState({ status: 1, name: '', parent_id: null, id: '' });
            }} />
          </div>
        </div>
        <AttributeTable
          disabled={attribute?.id}
          data={attributeState?.data}
          onClick={(item: any) => {
            setAttribute(item);
          }}
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
          attributeState?.data?.length > 0 ? <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={attributeState?.paginate?.totalPages}
          /> : <div className='h-[58px]' />
        }
      </div>
      <AttributeModal
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

export default Attribute