import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ForgotPassword() {
    return <div>
        <h1>Forgot Password</h1>
        <Outlet/>
    </div>;
  }
  