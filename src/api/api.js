import {post,get} from './http'
import "@/mock/index.js"

//登录界面
export const login = p => post('/login',p)
//获取工作台页面数据
export const getWorkdesk = () => get('/getWorkdesk')
//获取工作台页面echarts数据
export const getWorkdeskEchartsData = () => get('/getWorkdeskEchartsData')
//获取权益页面数据
export const getProfitInfo = () => get('/profitInfo')
//获取权益列表页面
export const getProfitList = p => post('/profitList',p)
//获取企业视图页面数据
export const getCompanyProfitInfo = () => get('/companyProfitInfo')
//获取企业视图权益列表页面
export const getCompanyProfitList = p => post('/companyProfitList',p)



