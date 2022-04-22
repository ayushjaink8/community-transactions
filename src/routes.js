import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Connect from './pages/Connect';
import Explore from './pages/Explore';
import Orders from './pages/Orders';
import NotFound from './pages/Page404';
import Home from './pages/Home';
import Product from './pages/Product';
import Categories from './pages/Categories';

import { useMoralis } from "react-moralis";
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Router() {

  const {account} = useMoralis();

  const Authroutes = (account, ele) => {
    return <>{
      (account) ? ele : <Navigate to="/login" replace />
    }</>
  }

  const autoLoginRoutes = (account, ele) => {
    return <>{
      (account) ? <Navigate to="/dashboard/app" replace /> : ele
    }</>

  }

  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: autoLoginRoutes(account, <Login />) },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: autoLoginRoutes(account, <Navigate to="/login" />) },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: Authroutes(account, <Navigate to="/dashboard/app" replace />) },
        { path: 'app', element: Authroutes(account, <DashboardApp/>) },
        { path: 'orders', element: Authroutes(account, <Orders />) },
        { path: 'connect', element: Authroutes(account, <Connect />) },
        { path: 'explore', element: Authroutes(account, <Explore />) },
        { path: 'home', element: Authroutes(account, <Home/>) },
        { path: 'product', element: Authroutes(account, <Product/>) },
        { path: 'categories', element: Authroutes(account, <Categories/>) },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
