import avatar from '@/assets/images/avatar.png'

const Mock = require('mockjs');
//登录
Mock.mock("/mock/login", 'post', function (option) {
    const params = JSON.parse(option.body)
    sessionStorage.setItem('username', params.username)
    return {
        code: 200,
        msg: "参数成功",
        data: {
            title: "信息标题",
            content: "登陆成功",
            data: {
                username: params.username,
                iconPath: avatar
            }
        },
    };
})
//工作台查询
Mock.mock("/mock/getWorkdesk", 'get', function (option) {
    return {
        code: 200,
        data: {
            activity: {
                activityEnd: {
                    title1: "周年庆活动",
                    time1: "2023-10-12",
                    title2: "积分抽奖活动标…",
                    time2: "2023-10-12",
                },
                activityRemid: {
                    title1: "周年庆活动",
                    time1: "2023-10-12",
                    title2: "积分抽奖活动标…",
                    time2: "2023-10-12",
                },
                activityTodo: {
                    title1: "周年庆活动",
                    time1: "2023-10-12",
                    title2: "积分抽奖活动标…",
                    time2: "2023-10-12",
                },
                systemInform: {
                    title1: "周年庆活动",
                    title2: "积分抽奖活动标…",
                }
            },
            dataManage: {
                validAll: "1320",
                onlineAll: "1320",
                profitAll: "1320",
                productAll: "1320",
                usedA: "1320",
                spread: "1",
            },
            barData: [120, 200, 150, 80, 70, 110, 130, 99, 88, 99],
            funnelData: [
                {
                    value: 60,
                    name: "V3",
                    memberAll: "100",
                    profitMember: "12",
                    hasMember: "111",
                    usedMember: "112",
                    itemStyle: {
                        color: "#6DC0FC",
                    },
                },
                {
                    value: 40,
                    name: "V4",
                    memberAll: "100",
                    profitMember: "12",
                    hasMember: "111",
                    usedMember: "112",
                    itemStyle: {
                        color: "#0594FA",
                    },
                },
                {
                    value: 20,
                    name: "V5",
                    memberAll: "100",
                    profitMember: "12",
                    hasMember: "111",
                    usedMember: "112",
                    itemStyle: {
                        color: "#0052D9",
                    },
                },
                {
                    value: 80,
                    name: "V2",
                    memberAll: "100",
                    profitMember: "12",
                    hasMember: "111",
                    usedMember: "112",
                    itemStyle: {
                        color: "#B3E0F9",
                    },
                },
                {
                    value: 100,
                    name: "V1",
                    memberAll: "100",
                    profitMember: "12",
                    hasMember: "111",
                    usedMember: "112",
                    itemStyle: {
                        color: "#73CCFF",
                    },
                },
            ],
            memberData: {
                memberAll: "132",
                profitMember: "132",
                hasMember: "132",
                usedMember: "132",
            }
        },
    };
})
//查询工作台echarts数据
Mock.mock("/mock/getWorkdeskEchartsData", 'get', function (option) {
    const randomBar = () => {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(parseInt(Math.random() * 1000))
        }
        return arr
    }
    const randomNumber = () => {
        return parseInt(Math.random() * 1000)
    }
    return {
        code: 200,
        data: {
            barData: randomBar(),
            funnelData: [
                {
                    value: 60,
                    name: "V3",
                    memberAll: randomNumber(),
                    profitMember: randomNumber(),
                    hasMember: randomNumber(),
                    usedMember: randomNumber(),
                    itemStyle: {
                        color: "#6DC0FC",
                    },
                },
                {
                    value: 40,
                    name: "V4",
                    memberAll: randomNumber(),
                    profitMember: randomNumber(),
                    hasMember: randomNumber(),
                    usedMember: randomNumber(),
                    itemStyle: {
                        color: "#0594FA",
                    },
                },
                {
                    value: 20,
                    name: "V5",
                    memberAll: randomNumber(),
                    profitMember: randomNumber(),
                    hasMember: randomNumber(),
                    usedMember: randomNumber(),
                    itemStyle: {
                        color: "#0052D9",
                    },
                },
                {
                    value: 80,
                    name: "V2",
                    memberAll: randomNumber(),
                    profitMember: randomNumber(),
                    hasMember: randomNumber(),
                    usedMember: randomNumber(),
                    itemStyle: {
                        color: "#B3E0F9",
                    },
                },
                {
                    value: 100,
                    name: "V1",
                    memberAll: randomNumber(),
                    profitMember: randomNumber(),
                    hasMember: randomNumber(),
                    usedMember: randomNumber(),
                    itemStyle: {
                        color: "#73CCFF",
                    },
                },
            ],
            memberData: {
                memberAll: randomNumber(),
                profitMember: randomNumber(),
                hasMember: randomNumber(),
                usedMember: randomNumber(),
            }
        },
    };
})