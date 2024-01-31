import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RouteName } from '../utils/lib/routeName';

const RequireAuth = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    return (
        token ? <Outlet /> : <Navigate to={RouteName.Login} state={{ from: location }} replace />
    )
}

export default RequireAuth