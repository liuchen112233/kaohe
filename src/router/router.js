import React, { lazy } from "react";
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import("@/pages/Home"))
const About = lazy(() => import("@/pages/About"))
const Error = lazy(() => import("@/pages/Error"))

export const routes = [
    {
        path: "/",
        element: <Navigate to="/home"/>
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "*",
        element: <Error />
    },
]