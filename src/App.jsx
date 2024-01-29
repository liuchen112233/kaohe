import React, { lazy, Suspense } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom"
import { Button } from "antd"
import Router from './router/index';
function App() {
    return (
    <div className="App">
        <Router></Router>
    </div>)
}
export default App