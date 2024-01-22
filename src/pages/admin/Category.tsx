import { useState } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Layout from '../../components/admin/Layout';
import { SearchInput } from '../../components/custom/AppInput';
import { ActionButton, AddNewButton, FilterButton } from '../../components/custom/AppButton';
import { AppImages } from '../../utils/lib/images';
import CategoryModal from '../../components/modal/admin/CategoryModal';

const Category = () => {

  const [isOpen, setIsOpen] = useState<any>(false);
  const [state, setState] = useState<any>({ status: 1 });

  const handleChange = (e: any) => {
    setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleSelectImage = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setState((prevState: any) => ({ ...prevState, image: imageUrl }));
    }
    reader.readAsDataURL(image);
  }

  return (
    <Layout title='Categories'>
      <div className='bg-white rounded-md my-3 shadow-sm p-4'>
        <div className='w-full flex justify-between items-center'>
          <SearchInput placeholder={'Search category...'} />
          <div className='flex items-center'>
            <FilterButton />
            <AddNewButton onClick={() => { setIsOpen(true) }} />
          </div>
        </div>
        <table className='w-full mt-4 text-sm max-sm:text-xs'>
          <thead className='font-semibold text-gray-500 bg-gray-50'>
            <tr>
              <td className='w-[70px] text-center'>#</td>
              <td className='px-1'>Category Name</td>
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
                    <img src={AppImages.Product} alt='' style={{ objectFit: 'cover', width: 35, height: 28, borderRadius: 3 }} />
                    <div>Double Cheese Burger</div>
                  </td>
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
      <CategoryModal
        isOpen={isOpen}
        state={state}
        handleChange={handleChange}
        handleSelectImage={handleSelectImage}
        handleClose={() => { setIsOpen(false) }}
      />
    </Layout>
  )
}

export default Category