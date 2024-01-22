import { useState } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { ActionButton, AddNewButton, FilterButton } from '../../components/custom/AppButton';

const Customer = () => {

  const [isAddModal, setIsAddModal] = useState<any>(false);
  const [selected, setSelected] = useState<any>([]);
  const [state, setState] = useState<any>();

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

  return (
    <Layout title='Customer'>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search customer...'} />
          <div className='flex items-center'>
            <FilterButton />
            <AddNewButton onClick={() => { setIsAddModal(true) }} />
          </div>
        </div>
        <table className='w-full mt-4 text-sm max-sm:text-xs'>
          <thead className='font-semibold text-gray-500 bg-gray-50'>
            <tr>
              <td className='w-[70px] text-center'>#</td>
              <td className='px-1'>Customer Name</td>
              <td>Gender</td>
              <td>Phone</td>
              <td>Address</td>
              <td className='text-center w-[80px]'>Status</td>
              <td className='h-[45px] flex justify-center items-center'>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              [...Array(10)].map((value: any, index: any) => (
                <tr onClick={() => { }} key={index} className='transition-all duration-200 hover:bg-green-50'>
                  <td className='w-[70px] text-gray-500 text-center'>{index + 1}</td>
                  <td className='h-[50px] flex items-center gap-3 px-1'>
                    {/* <img src={AppImages.Product} alt='' style={{ objectFit: 'cover', width: 35, height: 28, borderRadius: 3 }} /> */}
                    <div>Double Cheese Burger</div>
                  </td>
                  <td>Male</td>
                  <td>087286868</td>
                  <td>Phnom Penh</td>
                  <td className='text-center w-[80px]'>
                    <div className='h-[50px] flex justify-center items-center'>
                      <GoDotFill className={`${false ? 'text-green-500' : 'text-gray-300'}`} />
                    </div>
                  </td>
                  <td>
                    <div className='h-[50px] px-1.5 flex justify-center items-center'>
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
        <div className='flex justify-end items-center mt-3 mb-1'>
          <div className='flex items-center gap-2 px-5 py-2.5 rounded-md hover:bg-gray-100'>
            <IoIosArrowBack size={13} />
            <span className='text-sm'>Preview</span>
          </div>
          <div className='flex items-center'>
            {
              [...Array(3)].map((value, index) => (
                <button key={index} className={`text-sm px-4 py-2.5 flex items-center justify-center rounded-md hover:bg-gray-100`}>
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
      {/* <Modal isOpen={isAddModal} handleClose={() => setIsAddModal(false)}>
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
      </Modal> */}
    </Layout>
  )
}

export default Customer