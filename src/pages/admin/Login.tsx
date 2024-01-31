import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../../components/custom/Toast';
import { AppInput, PasswordInput } from '../../components/custom/AppInput';
import { AppButton } from '../../components/custom/AppButton';
import Lottie from 'lottie-react';
import { ApiManager } from '../../utils/lib/axios';
import useAuth from '../../utils/hook/useAuth';
import { RouteName } from '../../utils/lib/routeName';
import { AppImages, AppLotties } from '../../utils/lib/images';
import { useAppDispatch } from '../../utils/hook/useRedux';
import { getProfileSuccess } from '../../redux/actions/profile.action';

interface ILogin {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const dispatch = useAppDispatch();
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
            ApiManager.post('login', state).then((res: any) => {
                if (res.message === true) {
                    setAuth(res?.data);
                    dispatch(getProfileSuccess(res?.data));
                    localStorage.setItem('token', res?.data?.token);
                    navigate(RouteName.Menu);
                    SuccessToast('Successfully!', `Login as ${res?.data?.email}`);
                } else {
                    ErrorToast('Wrong Credential!', 'Incorrect email or password.');
                }
                setIsLoading(false);
            }).catch((error: any) => {
                console.log(error);
                setIsLoading(false);
            });
        }
    }

    return (
        <div className='flex h-screen'>
            <div className='hidden sm:flex w-3/4 h-full justify-center items-center bg-white shadow z-[1]'>
                <Lottie animationData={AppLotties.Login} loop={true} style={{ width: 360, height: 360, marginBottom: 30 }} />
            </div>
            <div className='w-full sm:w-[680px] h-full flex justify-center items-center bg-gray-50'>
                <div className='w-full h-full sm:w-3/4 sm:h-auto bg-white flex flex-col rounded-md shadow pt-14 sm:py-6 px-9 mb-5'>
                    <img src={AppImages.LogoIcon} alt='' width={'45%'} height={'45%'} className='self-center mb-3' />
                    <div className='font-bold text-xl'>Login</div>
                    <div className='text-md text-gray-500 mb-3'>Sign in to continue</div>
                    <AppInput type='email' label='Email' name='email' error={error?.email} value={state?.email} onChange={handleChange} />
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