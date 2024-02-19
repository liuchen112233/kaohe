import React, { lazy } from "react";
import { Navigate } from 'react-router-dom'

const Error = lazy(() => import("@/pages/Error/Error.jsx"))
const Index = lazy(() => import("@/pages/Index/Index.jsx"))
const Login = lazy(() => import("@/pages/Login/Login.jsx"))
const Member = lazy(() => import("@/pages/Member/Member.jsx"))
const CustomerManage = lazy(() => import("@/pages/CustomerManage/CustomerManage.jsx"))

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
        path: "/CustomerManage",
        element: <CustomerManage />
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