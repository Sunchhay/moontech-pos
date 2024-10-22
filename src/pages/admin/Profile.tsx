import { FaCamera } from "react-icons/fa"
import Layout from "../../components/admin/Layout"
import { FormDropdown, FormInput, FormPasswordInput } from "../../components/custom/AppInput"
import { AppImages } from "../../utils/lib/images"
import { genderList } from "../../utils/lib/gender"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hook/useRedux"
import { ErrorToast, SuccessToast } from "../../components/custom/Toast"
import SaveDialog from "../../components/modal/dialog/SaveDialog"
import axios from "../../utils/lib/api"
import ProfileAvatar from "../../components/custom/ProfileAvatar"
import { getProfileSuccess } from "../../redux/actions/profile.action"
import { IoIosArrowForward } from "react-icons/io"
import ChangePasswordModal from "../../components/modal/admin/ChangePasswordModal"

const Profile = () => {
  const dispatch = useAppDispatch();
  const profile: any = useAppSelector(state => state.profile);
  const [state, setState] = useState<any>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    setState(profile.data);
  }, [profile.data]);

  const handleChange = (e: any) => {
    if (e.target.value && (error && error[e.target.name])) {
      handleError(e.target.name, null);
    }
    setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleError = (stateName: any, value: any) => {
    setError((prevState: any) => ({ ...prevState, [stateName]: value }));
  }

  const validation = () => {
    let isValid = true;
    if (state?.password) {
      if (!state?.confirm_password) {
        isValid = false;
        handleError('confirm_password', 'is_rquired');
        ErrorToast('Invalid Form!', 'Please enter your confirm password.');
      } else if (state?.password !== state?.confirm_password) {
        isValid = false;
        handleError('confirm_password', 'is_rquired');
        ErrorToast('Invalid Form!', 'Password and Confirm Password must match.');
      }
    }
    if (!state?.phone) {
      isValid = false;
      handleError('phone', 'is_rquired');
      ErrorToast('Invalid Form!', 'Please enter your phone.');
    }
    if (!state?.gender) {
      isValid = false;
      handleError('gender', 'is_rquired');
      ErrorToast('Invalid Form!', 'Please select your gender.');
    }
    if (!state?.name) {
      isValid = false;
      handleError('name', 'is_rquired');
      ErrorToast('Invalid Form!', 'Please enter your name.');
    }
    if (isValid) {
      setOpenDialog(true);
    }
  }

  const handleSave = () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append('name', state?.name);
    formdata.append('gender', state?.gender);
    formdata.append('phone', state?.phone);
    formdata.append('password', state?.password);
    formdata.append('image', state?.imageUrl ? state?.imageUrl : state?.image);
    axios.post('profile/update', formdata).then((res: any) => {
      if (res?.data?.message === true) {
        dispatch(getProfileSuccess(res?.data?.data));
        SuccessToast('Updated Successfully!');
      } else {
        ErrorToast('Ops! Something went wrong.');
      }
      setIsLoading(false);
      setOpenDialog(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      setOpenDialog(false);
    });
  }

  return (
    <Layout title="Profile">
      <div className='flex gap-3'>
        <div className="w-1/2 bg-white rounded-lg pb-9 pt-8 px-10 mt-3 mb-3 shadow-sm">
          <div className="flex justify-center py-3">
            <ProfileAvatar
              image={state?.image}
              setState={setState}
            />
          </div>
          <div className="font-semibold text-center text-sm mt-1 mb-6 text-gray-700">{state?.email}</div>
          <FormInput
            label='Name'
            placeholder='Enter name'
            name='name'
            value={state?.name}
            error={error?.name}
            onChange={handleChange}
          />
          <FormDropdown
            data={genderList}
            label='Gender'
            placeholder='Select'
            name='gender'
            value={state?.gender}
            onChange={handleChange}
          />
          <FormInput
            label='Phone'
            placeholder='Enter phone'
            name='phone'
            value={state?.phone}
            onChange={handleChange}
          />
          <button onClick={() => setChangePassword(true)} className='w-full mb-4 text-left'>
            <div className='text-[13px] text-gray-600 mb-[3px]'>{'Password'}</div>
            <div className={`${'flex justify-between items-center px-3 rounded border border-solid border-gray-200 hover:border-teal-500 hover:opacity-75'}`}>
              <div className='w-full rounded text-[13px] py-[8px]'>***********</div>
              <IoIosArrowForward size={17} color={'gray'} />
            </div>
          </button>
          <button onClick={validation} className="py-2.5 text-[13px] text-white bg-green-500 rounded mt-10 mb-5 w-full">Save</button>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center bg-white rounded-lg pt-5 pb-7 px-10 mt-3 mb-3 shadow-sm">
          <img src={profile?.data?.company?.image} alt="" className="w-[60%]" />
        </div>
      </div>
      {
        changePassword && <ChangePasswordModal
          isOpen={changePassword}
          handleClose={() => setChangePassword(false)}
        />
      }
      {
        openDialog && <SaveDialog
          isOpen={openDialog}
          handleSave={handleSave}
          handleClose={() => setOpenDialog(false)}
        />
      }

    </Layout>
  )
}

export default Profile