import React, { lazy, Suspense } from "react";
// import Home from "./pages/Home/index"
// import About from "./pages/About/index"
import { Link, Routes, Route ,Navigate} from "react-router-dom"
import {Button} from "antd"
const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
function App() {
    return <div>
        <h1>App</h1>
        <Button type="primary">查询</Button>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <Suspense>
            <Routes>
                <Route path="/about" element={<About />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Navigate to="/home" />}></Route>
            </Routes>
        </Suspense>
    </div>
}
export default App