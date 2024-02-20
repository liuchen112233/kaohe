import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const routerSlice = createSlice({
    name: "demo",
    initialState: {
        tabList: [
            {
                label: '工作台',
                key: "1",
                closeIcon: false,
                path: "/index",
                menuKey:["1"]
            },
        ],
        activeKey: "1",
        activeMenu: "1",
    },
    reducers: {
        openMenu(state, action) {
            state.tabList.push(action.payload)
        },
        closeMenu(state, action) {

        },
        changeActiveKey(state, action) {
            state.activeKey = action.payload
        },
        changeactiveMenu(state, action) {
            state.activeMenu = action.payload
        }
    }
})

export default routerSlice.reducer;
export const { changeActiveKey, openMenu, changeactiveMenu } = routerSlice.actions
//创建异步方法
export const getData = createAsyncThunk("order/fetchDemoData", async (data, { dispatch }) => {

})