import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Regsiter from './pages/admin/Register';
import Dashboard from './pages/admin/Dashboard';
import Menu from './pages/pos/Menu';
import Reservation from './pages/pos/Reservation';
import Product from './pages/admin/Product';
import RequireAuth from './components/RequireAuth';
import AlreadyHaveAuth from './components/AlreadyHaveAuth';
import ErrorPage from './components/ErrorPage';

function App() {

  return (
    <Routes>
      <Route path='*' element={<ErrorPage />} />
      <Route element={<AlreadyHaveAuth />}>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Regsiter />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path='admin/dashboard' element={<Dashboard />} />
        <Route path='admin/products' element={<Product />} />
        <Route path='menu' element={<Menu />} />
        <Route path='reservation' element={<Reservation />} />
      </Route>
    </Routes>
  );
}

export default App;
