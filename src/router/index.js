import React, { useEffect, Suspense } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { routes } from './router'

export default function Index() {
    const element = useRoutes(routes)

    return (
        <Authen route={element} children={element.children}>
            <Suspense>
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
    console.log(props);
    useEffect(() => {
        if (route.props.match.pathname === "/login" && username) {
            navigate('/index')
        }
    }, [route, navigate,username])
    return children
}

