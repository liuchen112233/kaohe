import React, { lazy } from "react";
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))

export const routes = [
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/",
        element: <Navigate to="/home"/>
    }
]