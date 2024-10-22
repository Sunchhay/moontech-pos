import Modal from '../Modal'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { HiOutlineSave } from 'react-icons/hi';
import { FormPasswordInput } from '../../custom/AppInput';
import { useState } from 'react';
import { ErrorToast, SuccessToast } from '../../custom/Toast';
import { ApiManager } from '../../../utils/lib/api';

export interface IPassword {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const ChangePasswordModal = ({ isOpen, handleClose }: Props) => {

    const [state, setState] = useState<IPassword>();
    const [error, setError] = useState<IPassword>();

    const handleChange = (e: { target: { name: keyof IPassword, value: any } }) => {
        if (e.target.value && (error && error[e.target.name])) {
            handleError(e.target.name, null);
        }
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleError = (stateName: any, value: any) => {
        setError((prevState: any) => ({ ...prevState, [stateName]: value }));
    }


    const validation = () => {
        if (!state?.current_password) {
            handleError('current_password', 'is_rquired');
            ErrorToast('Invalid Current Password!', 'Please enter current password');
        } else if (!state?.new_password) {
            handleError('new_password', 'is_rquired');
            ErrorToast('Invalid New Password!', 'Please enter new password');
        } else if (!state?.confirm_password) {
            handleError('confirm_password', 'is_rquired');
            ErrorToast('Invalid Confirm Password!', 'Please enter your confirm password.');
        } else if (state?.new_password !== state?.confirm_password) {
            handleError('confirm_password', 'is_rquired');
            ErrorToast('Invalid Confirm Password!', 'Password and Confirm Password must be match.');
        } else {
            ApiManager.POST('change-password', state).then((response) => {
                if (response.message === true) {
                    SuccessToast('Success', 'Password has been changed successfully!');
                    handleClose();
                } else {
                    if (response.error === 'Current Password & Old Password doesn\'t match.') {
                        handleError('current_password', 'is_rquired');
                    }
                    ErrorToast('Sometime went wrong', response.error);
                }
            }).catch((err: any) => {
                ErrorToast('Sometime went wrong', err);
            });
        }
    }

    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className='max-h-full bg-white rounded-md shadow-sm pt-6 px-8'>
                <div className='font-semibold text-lg'>Change Password?</div>
                <div className='text-[13px] border-b border-b-gray-200 pb-3'>Enter your current password in the field below. Then, enter new password and confirm password.</div>
                <div className='pt-2 pb-6'>
                    <FormPasswordInput
                        label='Current Password'
                        placeholder='********'
                        name='current_password'
                        value={state?.current_password}
                        error={error?.current_password}
                        onChange={handleChange}
                    />
                    <FormPasswordInput
                        label='New Password'
                        placeholder='********'
                        name='new_password'
                        value={state?.new_password}
                        error={error?.new_password}
                        onChange={handleChange}
                    />
                    <FormPasswordInput
                        label='Confirm Password'
                        placeholder='********'
                        name='confirm_password'
                        value={state?.confirm_password}
                        error={error?.confirm_password}
                        onChange={handleChange}
                    />
                    <div className='flex justify-end items-center gap-1.5 mt-6'>
                        <button onClick={handleClose} className='flex items-center gap-1.5 text-white text-xs bg-red-400 px-2.5 py-2 rounded-md hover:opacity-85'>
                            <IoCloseCircleOutline size={15} />
                            <span>Close</span>
                        </button>
                        <button onClick={validation} className='flex items-center gap-1.5 text-white text-xs bg-green-500 px-2.5 py-2 rounded-md hover:opacity-85'>
                            <HiOutlineSave size={15} />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ChangePasswordModal