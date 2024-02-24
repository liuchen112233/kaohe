import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'antd';

import zh_CN from 'antd/es/locale/zh_CN';
// import 'default-passive-events';

import App from "./App.jsx"

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<BrowserRouter>
    <ConfigProvider locale={zh_CN}>
        <App />
    </ConfigProvider>
</BrowserRouter>)
