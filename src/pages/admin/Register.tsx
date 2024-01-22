'use client'
import { useState } from 'react'
import Lottie from "lottie-react";
import { RouteName } from '../../utils/lib/routeName';
import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import axios from '../../utils/lib/axios';
import { AppInput, PasswordInput } from '../../components/custom/AppInput';
import { AppButton } from '../../components/custom/AppButton';
import { AppImages, AppLotties } from '../../utils/lib/images';

interface IRegister {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const Regsiter = () => {

    const navigate = useNavigate();
    const [state, setState] = useState<IRegister>();
    const [error, setError] = useState<IRegister | any>();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: any) => {
        if (e.target.value && (error && error[e.target.name])) {
            handleError(e.target.name, null);
        }
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }
    const handleError = (name: keyof IRegister, value: string | null) => {
        setError((prevState: any) => ({ ...prevState, [name]: value }));
    }

    const handleRegister = () => {
        if (!state?.name) {
            handleError('name', 'is_rquired');
            ErrorToast('Invalid Form!', 'Please enter your full name.');
        } else if (!state?.email) {
            handleError('email', 'is_rquired');
            ErrorToast('Invalid Form!', 'Please enter your email address.');
        } else if (!state?.password) {
            handleError('password', 'is_rquired');
            ErrorToast('Invalid Form!', 'Please enter your password.');
        } else if (!state?.confirm_password) {
            handleError('confirm_password', 'is_rquired');
            ErrorToast('Invalid Form!', 'Please enter your confirm password.');
        } else if (state?.password !== state?.confirm_password) {
            handleError('confirm_password', 'is_rquired');
            ErrorToast('Invalid Form!', 'Your password and confirm password must match.');
        } else {
            setIsLoading(true);
            axios.post('register', state).then((res: any) => {
                if (res.data.message === true) {
                    navigate(RouteName.Login);
                    SuccessToast('Registration Successfully!');
                } else if (res.data.isExist) {
                    ErrorToast('Email is already existed', 'Please enter another email address.');
                } else {
                    ErrorToast('Ops! Something went wrong.');
                }
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        }
    }


    return (
        <div className='flex h-screen'>
            <div className='w-3/4 h-full flex justify-center items-center bg-white shadow z-[1]'>
                <Lottie animationData={AppLotties.Login} loop={true} style={{ width: 500, height: 500 }} />
            </div>
            <div className='w-2/4 h-full flex justify-center items-center bg-gray-50'>
                <div className='w-[85%] bg-white flex flex-col rounded-md shadow py-6 px-9 mb-5'>
                    <img src={AppImages.Logo} alt='' width={110} height={110} className='self-center mb-3' />
                    <div className='font-bold text-xl'>Register</div>
                    <div className='text-md text-gray-500 mb-3'>Create new account to continue</div>
                    <AppInput label='Full Name' name='name' error={error?.name} value={state?.name} onChange={handleChange} />
                    <AppInput label='Email' name='email' error={error?.email} value={state?.email} onChange={handleChange} />
                    <PasswordInput label='Password' error={error?.password} name='password' value={state?.password} onChange={handleChange} />
                    <PasswordInput label='Confirm Password' error={error?.confirm_password} name='confirm_password' value={state?.confirm_password} onChange={handleChange} />
                    <AppButton isLoading={isLoading} onClick={handleRegister} title='Register' className='mt-8 mb-3' />
                    <div className='self-center text-sm mb-5'>
                        Already have an account?
                        <a href={RouteName.Login} className='text-green-500 hover:opacity-75 cursor-pointer'> Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Regsiter