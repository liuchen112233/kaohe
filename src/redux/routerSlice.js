import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const routerSlice = createSlice({
    name: "demo",
    initialState: {
        tabList: [
            {
                label: '工作台',
                key: "1",
                closeIcon:false,
                path:"/index"
            },
            // {
            //     label: '会员中心',
            //     key: uuid.v4(),
            // },
        ],
        activeKey:"1",
    },
    reducers: {
        openMenu(state, action) {
            state.tabList.push(action.payload)
        },
        closeMenu(state, action){

        },
        changeActiveKey(state, action){
            state.activeKey=action.payload
        }
    }
})

export default routerSlice.reducer;
export const { changeActiveKey,openMenu } = routerSlice.actions
//创建异步方法
export const getData = createAsyncThunk("order/fetchDemoData", async (data, { dispatch }) => {

})