import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/hook/useAuth';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import axios from '../../utils/lib/axios';
import { AppInput, PasswordInput } from '../../components/custom/AppInput';
import { AppButton } from '../../components/custom/AppButton';
import { RouteName } from '../../utils/lib/routeName';
import Lottie from 'lottie-react';
import { AppImages, AppLotties } from '../../utils/lib/images';
import Cookies from 'js-cookie';

interface ILogin {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [state, setState] = useState<ILogin>();
    const [error, setError] = useState<ILogin | any>();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: any) => {
        if (e.target.value && (error && error[e.target.name])) {
            handleError(e.target.name, null);
        }
        setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }
    const handleError = (name: keyof ILogin, value: string | null) => {
        setError((prevState: any) => ({ ...prevState, [name]: value }));
    }

    const handleLogin = () => {
        if (!state?.email) {
            handleError('email', 'is_rquired');
            ErrorToast('Invalid Form!', 'Please enter your email address.');
        } else if (!state?.password) {
            handleError('password', 'is_rquired');
            ErrorToast('Invalid Form!', 'Please enter your password.');
        } else {
            setIsLoading(true);
            axios.post('login', state).then((res: any) => {
                if (res.data.message === true) {
                    setAuth(res?.data?.data);
                    Cookies.set('token', res?.data?.data?.token, { expires: 7, secure: true });
                    navigate(RouteName.Menu);
                    SuccessToast('Successfully!', `Login as ${res?.data?.data?.email}`);
                } else {
                    ErrorToast('Wrong Credential!', 'Incorrect email or password.');
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
                <Lottie animationData={AppLotties.Login} loop={true} style={{ width: 360, height: 360, marginBottom: 30 }} />
            </div>
            <div className='w-[680px] h-full flex justify-center items-center bg-gray-50'>
                <div className='w-3/4 bg-white flex flex-col rounded-md shadow py-6 px-9 mb-5'>
                    <img src={AppImages.LogoIcon} alt='' width={110} height={110} className='self-center mb-3' />
                    <div className='font-bold text-xl'>Login</div>
                    <div className='text-md text-gray-500 mb-3'>Sign in to continue</div>
                    <AppInput label='Email' name='email' error={error?.email} value={state?.email} onChange={handleChange} />
                    <PasswordInput label='Password' error={error?.password} name='password' value={state?.password} onChange={handleChange} />
                    <AppButton isLoading={isLoading} title='Sign In' className='mt-8 mb-3' onClick={handleLogin} />
                    <div className='self-center text-sm mb-5'>
                        Don't have an account yet?
                        <a href={RouteName.Register} className='text-green-500 hover:opacity-75 cursor-pointer'> Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login