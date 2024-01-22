import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Regsiter from './pages/admin/Register';
import Dashboard from './pages/admin/Dashboard';
import Menu from './pages/pos/Menu';
import Product from './pages/admin/Product';
import RequireAuth from './components/RequireAuth';
import AlreadyHaveAuth from './components/AlreadyHaveAuth';
import ErrorPage from './components/ErrorPage';
import { RouteName } from './utils/lib/routeName';
import Brand from './pages/admin/Brand';
import Category from './pages/admin/Category';
import Color from './pages/admin/Color';
import Size from './pages/admin/Size';
import MainAdmin from './components/admin/MainAdmin';
import Customer from './pages/admin/Customer';
import Help from './pages/admin/Help';
import Sale from './pages/admin/Sale';
import POSReservation from './pages/pos/POSReservation';
import Reservation from './pages/admin/Reservation';

function App() {

  return (
    <Routes>
      <Route path='*' element={<ErrorPage />} />
      <Route element={<AlreadyHaveAuth />}>
        <Route path='/' element={<Login />} />
        <Route path={RouteName.Login} element={<Login />} />
        <Route path={RouteName.Register} element={<Regsiter />} />
      </Route>
      <Route element={<RequireAuth />}>
        {/* Cahier */}
        <Route path={RouteName.Menu} element={<Menu />} />
        <Route path={RouteName.POSReservation} element={<POSReservation />} />
        {/* Page */}
        <Route element={<MainAdmin />}>
          <Route path={RouteName.Dashboard} element={<Dashboard />} />
          <Route path={RouteName.Customers} element={<Customer />} />
          <Route path={RouteName.Brands} element={<Brand />} />
          <Route path={RouteName.Categories} element={<Category />} />
          <Route path={RouteName.Colors} element={<Color />} />
          <Route path={RouteName.Sizes} element={<Size />} />
          <Route path={RouteName.Products} element={<Product />} />
          <Route path={RouteName.Reservation} element={<Reservation />} />
          <Route path={RouteName.Sales} element={<Sale />} />
          {/* Analytics */}
          <Route path={RouteName.Revenue} element={<Product />} />
          <Route path={RouteName.Reports} element={<Product />} />
          <Route path={RouteName.Teams} element={<Product />} />
          {/* User */}
          <Route path={RouteName.Profile} element={<Product />} />
          <Route path={RouteName.Settings} element={<Product />} />
          <Route path={RouteName.Help} element={<Help />} />
          <Route path={RouteName.Teams} element={<Product />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
