import React from "react";
import { FundProjectionScreenOutlined, SketchOutlined, TeamOutlined } from '@ant-design/icons'
const menu = [
    {
        key: "1",
        icon: <FundProjectionScreenOutlined />,
        label: "工作台",
        path: '/index',
    },
    {
        key: "2",
        icon: <TeamOutlined />,
        label: "客户管理",
        children: [
            {
                key: "2-1",
                label: "客户信息管理",
                children: [{
                    key: "2-1-1",
                    label: "客户视图",
                    path: '/CustomerManage',
                }
                ]
            },
        ]
    },
    {
        key: "3",
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    }
]

export default menu