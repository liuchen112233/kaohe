import React from "react";
import { FundProjectionScreenOutlined, SketchOutlined, TeamOutlined } from '@ant-design/icons'
const uuid = require('uuid')
const menu = [
    {
        key: uuid.v4(),
        icon: <FundProjectionScreenOutlined />,
        label: "工作台",
        path: '/index'
    },
    {
        key: uuid.v4(),
        icon: <TeamOutlined />,
        label: "客户管理",
        children: [
            {
                key: uuid.v4(),
                label: "客户信息管理",
                path: '/CustomerManage'
            },
        ]
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },
    {
        key: uuid.v4(),
        icon: <SketchOutlined />,
        label: "会员中心",
        path: '/member'
    },

]

export default menu