'use client'
import React, { createContext, useLayoutEffect, useState } from 'react'
import { ApiManager } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../lib/routeName';
import { useAppDispatch } from '../hook/useRedux';
import { getProfileSuccess } from '../../redux/actions/profile.action';

export const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [auth, setAuth] = useState({});

    useLayoutEffect(() => {
        const getUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                ApiManager.get('profile').then((res: any) => {
                    if (res.status === 200) {
                        setAuth(res?.data);
                        dispatch(getProfileSuccess(res?.data));
                    } else {
                        localStorage.removeItem('token');
                        navigate(RouteName.Login, { replace: true });
                        setAuth({});
                        dispatch(getProfileSuccess({}));
                    }
                });
            } else {
                setAuth({});
            }
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider