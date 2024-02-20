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
                menuKey: ["1"]
            },
        ],
        activeKey: "1",
        activeMenu: ["1"],
    },
    reducers: {
        //打开菜单
        openMenu(state, action) {
            console.log(state.tabList);
            state.tabList.push(action.payload)
        },
        //关闭菜单
        closeMenu(state, action) {
            const index = state.tabList.findIndex(el => el.key === action.payload)
            if (index !== 0 && index === state.tabList.length - 1 && state.tabList[index].key === state.activeKey) {
                state.activeKey = state.tabList[index - 1].key
                state.activeMenu = state.tabList[index - 1].menuKey
            }
            state.tabList.splice(index, 1)
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
export const { changeActiveKey, openMenu, changeactiveMenu, closeMenu } = routerSlice.actions
//创建异步方法
export const getData = createAsyncThunk("order/fetchDemoData", async (data, { dispatch }) => {

})