import React, { Suspense } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom"
import "@/style/index.less"
import { Layout } from "@/Layout/Layout.jsx"
import Router from './router/index';
function App() {
    return (
        <div className="App">
            <Router></Router>
        </div>)
}
export default App