import { configureStore } from "@reduxjs/toolkit"
import routerSlice from "./routerSlice"

export default configureStore({
    reducer: {
        // 这里放入各个模块
        routerSlice
    },
})