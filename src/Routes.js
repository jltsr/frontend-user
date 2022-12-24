import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from './component/layout/AppLayout';
import Page404 from './views/404/Page404';
import Signin from './component/layout/Signin';
import Dashboard from './views/app/dashboard/Dashboard';
import BlankLayout from './component/layout/BlankLayout';
import Signup from './component/layout/Signup';
import ForgotPassword from './component/layout/ForgotPassword';
import User from './views/app/user/User';
import SignupSuccess from './component/layout/SignupSuccess';
import Cart from './views/app/cart/Cart';
import Account from './views/app/user/Account';

export default function Routes(isLoggedIn) {
  return useRoutes([
    {
      path: '/',
      element: <BlankLayout/>,
      children: [
        { path: 'signin', element: <Signin/> },
        { path: 'signup', element: <Signup/> },
        { path: 'signup/success', element: <SignupSuccess/> },
        { path: 'forgotpassword', element: <ForgotPassword/> },
        { path: '404', element: <Page404 /> },
        {
          path: 'app',
          element:  isLoggedIn?  <AppLayout/>:<Navigate to="/signin"/>,
          children: [
            { path: 'dashboard', element: isLoggedIn?  <Dashboard/>:<Navigate to="/signin"/>},
            { path: 'cart', element: isLoggedIn?  <Cart/>:<Navigate to="/signin"/> },
            { path: 'user', element: isLoggedIn?  <User/>:<Navigate to="/signin" /> },
            { path: 'account', element:  isLoggedIn?  <Account/>:<Navigate to="/signin"/> },
          ]
        },
      ]
    },
    
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}



