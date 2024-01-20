import { Navigate, Outlet } from 'react-router-dom';
import { RouteName } from '../lib/routeName';
import Cookies from 'js-cookie';
import { useCallback } from 'react';

const AlreadyHaveAuth = () => {
    const getToken = useCallback(() => {
        const token = Cookies.get('token');
        return token;
    }, []);

    return (
        !getToken() ? <Outlet /> : <Navigate to={RouteName.Dashboard} replace={true} />
    )
}

export default AlreadyHaveAuth;