import React, { useEffect, Suspense } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { routes } from './router'
import { notification } from 'antd';
import { Skeleton } from 'antd';
export default function Index() {
    const element = useRoutes(routes)

    return (
        <Authen route={element} children={element.children}>
            <Suspense fallback={<Skeleton
                avatar
                active
                paragraph={{
                    rows: 20,
                }}
            />}>

                <div>{element}</div>
            </Suspense>
        </Authen>
    )

}
//实现路由拦截
const Authen = (props) => {
    const navigate = useNavigate()
    const { route, children } = props
    const username = sessionStorage.getItem('username')
    useEffect(() => {
        if (route.props.match.pathname === "/login" && username) {
            navigate('/index')
        } else if (route.props.match.pathname !== "/login") {
            if (!username) {
                notification.error({
                    message: "提示",
                    description: "登录过期"
                })
                navigate('/login')
            }
        }
    }, [route, navigate, username])
    return children
}
