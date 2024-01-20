'use client'
import { useState } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaCamera, FaList } from 'react-icons/fa';
import { PiSquaresFourLight } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowBack, IoIosArrowForward, IoMdTrash } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { IoCloseCircleOutline, IoPrintOutline } from 'react-icons/io5';
import { HiOutlineSave } from 'react-icons/hi';
import Layout from '../../components/admin/Layout';
import { FormDropdown, FormInput, FormInputArea, SearchInput } from '../../components/custom/AppInput';
import { ActionButton, CheckButton, FilterButton, IconButton, IconDropDown } from '../../components/custom/AppButton';
import { AppImages } from '../../lib/images';
import Modal from '../../components/modal/Modal';

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

  const [isRow, setIsRow] = useState<any>(true);
  const [isAddModal, setIsAddModal] = useState<any>(false);
  const [selected, setSelected] = useState<any>([]);
  const [state, setState] = useState<IProduct>();
  const [tableSelect, setTableSelect] = useState(['Category', 'Price', 'Total Sales', 'Status']);

  const handleChange = (e: any) => {
    setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleSelect = (index: any) => {
    if (selected.includes(index)) {
      setSelected((prevState: any) => prevState.filter((prevItem: any) => prevItem !== index));
    } else {
      setSelected((prevState: any) => ([...prevState, index]));
    }
  }

  const handleSelectAll = () => {
    if (selected.length === 10) {
      setSelected([]);
    } else {
      let data: any = [];
      [...Array(10)].map((value, index) => data.push(index));
      setSelected(data);
    }
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
    <Layout title={'Products'} onAdd={() => { setIsAddModal(true) }}>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search product...'} />
          <div className='flex items-center'>
            <FilterButton />
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
            <table className='w-full mt-4 text-sm max-sm:text-xs'>
              <thead className='font-semibold text-gray-500 bg-gray-50'>
                <tr>
                  <td><CheckButton onClick={handleSelectAll} isActive={selected?.length === 10} className='h-[45px]' /></td>
                  <td>Name</td>
                  {tableSelect?.includes('Category') && <td>Category</td>}
                  {tableSelect?.includes('Price') && <td>Price</td>}
                  {tableSelect?.includes('Status') && <td className='text-center'>Status</td>}
                  {tableSelect?.includes('Total Sales') && <td className='text-right'>Total Sales</td>}
                  <td className='h-[45px] flex justify-center items-center'>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  [...Array(10)].map((value: any, index: any) => (
                    <tr onClick={() => { }} key={index} className='transition-all duration-200 hover:bg-green-50'>
                      <td><CheckButton onClick={() => handleSelect(index)} isActive={selected?.includes(index)} /></td>
                      <td className='h-[55px] flex items-center gap-3'>
                        <img src={AppImages.Product} alt='' style={{ objectFit: 'cover', width: 35, height: 28, borderRadius: 3 }} />
                        <div>Double Cheese Burger</div>
                      </td>
                      {tableSelect?.includes('Category') && <td>Food</td>}
                      {tableSelect?.includes('Price') && <td>$12.50</td>}
                      {tableSelect?.includes('Status') && <td className='text-center'>
                        <div className='h-[55px] flex justify-center items-center'>
                          <GoDotFill className={`${false ? 'text-green-500' : 'text-gray-300'}`} />
                        </div>
                      </td>}
                      {tableSelect?.includes('Total Sales') && <td className='text-right'>$1250.00</td>}
                      <td>
                        <div className='h-[55px] px-1.5 flex justify-center items-center'>
                          <ActionButton
                            icon={<BsThreeDotsVertical size={18} className='text-gray-500' />}
                            onEdit={() => { }}
                            onActive={() => { }}
                            onDelete={() => { }}
                            onPrint={() => { }}
                            isLast={index === 9}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <>
              <div className='grid grid-cols-5 gap-4 pt-4 pb-[5.5px] px-2'>
                {
                  [...Array(10)].map(() => (
                    <div className='border border-solid border-gray-200 rounded-md p-3'>
                      <img src={AppImages.Product} alt='' style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: 3 }} />
                      <div className='text-sm mt-4'>Double Cheese Burger</div>
                      <div className='text-sm mt-2'>$12.50</div>
                      <div className='flex items-center gap-2 mt-5'>
                        <button onClick={() => { }} className={`w-2/4 flex justify-center items-center text-sm text-gray-500 py-1.5 gap-3 border border-gray-200 rounded-[4px] hover:border-gray-400`}>
                          <MdModeEdit size={15} />
                          <span>{'Edit'}</span>
                        </button>
                        <button onClick={() => { }} className={`w-2/4 flex justify-center items-center text-sm text-red-500 py-1.5 gap-3 border border-gray-200 rounded-[4px] hover:border-red-500`}>
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
        <div className='flex justify-end items-center mt-3 mb-1'>
          <div className='flex items-center gap-2 px-5 py-2.5 rounded-md hover:bg-gray-100'>
            <IoIosArrowBack size={13} />
            <span className='text-sm'>Preview</span>
          </div>
          <div className='flex items-center'>
            {
              [...Array(3)].map((value, index) => (
                <button className={`text-sm px-4 py-2.5 flex items-center justify-center rounded-md hover:bg-gray-100`}>
                  {index + 1}
                </button>
              ))
            }
            <BsThreeDots size={15} className='mx-4' />
          </div>
          <button className='flex items-center gap-2 px-5 py-2.5 rounded-md hover:bg-gray-100'>
            <span className='text-sm'>Next</span>
            <IoIosArrowForward size={13} />
          </button>
        </div>
      </div>
      <Modal isOpen={isAddModal} handleClose={() => setIsAddModal(false)}>
        <div className='w-3/4 max-h-full bg-white rounded-md shadow-sm pt-5 px-6'>
          <div className='w-full flex items-center justify-between border-b border-b-gray-200 pb-3'>
            <div className='font-semibold text-lg'>Add New Product</div>
            <div className='flex items-center gap-1.5'>
              <button onClick={() => setIsAddModal(false)} className='flex items-center gap-1.5 text-white text-xs bg-red-400 px-2.5 py-2 rounded-md hover:opacity-85'>
                <IoCloseCircleOutline size={15} />
                <span>Close</span>
              </button>
              <button onClick={() => setIsAddModal(false)} className='flex items-center gap-1.5 text-white text-xs bg-blue-700 px-2.5 py-2 rounded-md hover:opacity-85'>
                <IoPrintOutline size={15} />
                <span>Print Label</span>
              </button>
              <button onClick={() => setIsAddModal(false)} className='flex items-center gap-1.5 text-white text-xs bg-green-500 px-2.5 py-2 rounded-md hover:opacity-85'>
                <HiOutlineSave size={15} />
                <span>Save</span>
              </button>
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='w-full pt-4 pb-5 pr-2'>
              <FormInput label='Product Name' placeholder='Type here' name='name' value={state?.name} onChange={handleChange} />
              <div className='flex items-center gap-3'>
                <FormDropdown width='w-2/4' label='Brand' placeholder='Select Brand' name='description' value={state?.description} onChange={handleChange} />
                <FormDropdown width='w-2/4' label='Category' placeholder='Select Category' name='description' value={state?.description} onChange={handleChange} />
              </div>
              <div className='flex items-center gap-3'>
                <FormInput width='w-3/4' label='Price' placeholder='0.00' name='description' value={state?.description} onChange={handleChange} />
                <FormInput width='w-1/4' label='Qty' placeholder='0' name='description' value={state?.description} onChange={handleChange} type='number' />
              </div>
              <div className='flex items-center gap-3'>
                <FormInput width='w-3/4' label='Discount' placeholder='0' name='description' value={state?.description} onChange={handleChange} />
                <FormDropdown width='w-1/4' label='Type' placeholder='Select' name='description' value={state?.description} onChange={handleChange} />
              </div>
              <FormInput label='Barcode' placeholder='#123456789' name='description' value={state?.description} onChange={handleChange} />
              <FormInputArea label='Description' placeholder='Type here' name='description' value={state?.description} onChange={handleChange} />

            </div>
            <div className='w-[370px] pt-5 flex justify-end border-l border-l-gray-200'>
              <label htmlFor='getFile' className='w-[250px] h-[250px] border-2 border-dashed flex flex-col items-center justify-center border-gray-200 rounded'>
                {
                  state?.image ? <img src={state?.image} alt='' width={250} height={250} style={{ width: 250, height: 250, objectFit: 'cover', borderRadius: 6 }} />
                    : <>
                      <FaCamera className='text-gray-300' size={50} />
                      <div className='text-sm text-gray-400 mt-4'>Add Image Product</div>
                      <div className='text-sm text-gray-400 mt-3'>512 x 512</div>
                    </>
                }
              </label>
              <input id='getFile' type='file' name="profile" value='' onChange={handleSelectProfile} accept="image/png, image/jpeg" hidden />
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default Product