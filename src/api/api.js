import {post,get} from './http'
import "@/mock/index.js"

//登录界面
export const login = p => post('/login',p)
//获取工作台页面数据
export const getWorkdesk = () => get('/getWorkdesk')
//获取工作台页面echarts数据
export const getWorkdeskEchartsData = () => get('/getWorkdeskEchartsData')

