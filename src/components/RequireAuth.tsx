import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RouteName } from '../utils/lib/routeName';
import Cookies from 'js-cookie';

const RequireAuth = () => {
    const location = useLocation();
    const token = Cookies.get('token');

    return (
        token ? <Outlet /> : <Navigate to={RouteName.Login} state={{ from: location }} replace />
    )
}

export default RequireAuth