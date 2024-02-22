import React from "react"
import ReactDOM from "react-dom/client"
import {BrowserRouter} from "react-router-dom"
// import 'default-passive-events';

import App from "./App.jsx"

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<BrowserRouter><App/></BrowserRouter>)
