import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const MainAdmin = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default MainAdmin