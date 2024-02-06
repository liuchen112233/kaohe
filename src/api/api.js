import {post} from './http'
import "@/mock/index.js"

export const login = p => post('/login',p)