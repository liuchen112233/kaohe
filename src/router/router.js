import React, { lazy } from "react";
import { Navigate } from 'react-router-dom'

const Error = lazy(() => import("@/pages/Error/Error.jsx"))
const Index = lazy(() => import("@/pages/Index/Index.jsx"))
const Login = lazy(() => import("@/pages/Login/Login.jsx"))
const Member = lazy(() => import("@/pages/Member/Member.jsx"))
const CustomerView = lazy(() => import("@/pages/CustomerView/CustomerView.jsx"))

export const routes = [
    {
        path: "/",
        element: <Navigate to="/index"/>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/index",
        element: <Index />
    },
    {
        path: "/CustomerView",
        element: <CustomerView />
    },
    {
        path: "/member",
        element: <Member />
    },
    {
        path: "*",
        element: <Error />
    },
]