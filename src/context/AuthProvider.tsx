'use client'
import React, { createContext, useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ApiManager } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../lib/routeName';
export const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});

    useLayoutEffect(() => {
        const getUser = () => {
            const token = Cookies.get('token');
            if (token) {
                ApiManager.get('profile').then((res: any) => {
                    if (res.status === 200) {
                        setAuth(res?.data);
                    } else {
                        Cookies.remove('token');
                        navigate(RouteName.Login, { replace: true });
                        setAuth({});
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