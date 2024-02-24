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
//查询权益数据
Mock.mock("/mock/profitInfo", 'get', function (option) {
    const randomNumber = () => {
        return parseInt(Math.random() * 1000)
    }
    let arr = []
    let arr2 = []
    let arr3 = []
    let arr4 = []
    for (let i = 0; i < 20; i++) {
        arr.push({
            profitCost: randomNumber(),
            profitRelate: randomNumber(),
            profitUsetime: "2023/10/19 17:40",
            profitAddr: "北京",
            profitCard: randomNumber(),
            profitPay: randomNumber(),
            profitStatus: Math.round(Math.random() * 5),
            key: i + 1
        })
        arr2.push({
            time: "2024-02-16",
            rate: parseInt(Math.random() * 5)
        })
        arr3.push({
            time: "2024-02-16",
            rate: parseInt(Math.random() * 5)
        })
        arr4.push({
            time: "2024-02-16",
            rate: parseInt(Math.random() * 5)
        })
    }
    return {
        code: 200,
        data: {
            custInfo: {
                custName: "王雄",
                status: "侯爵",
                min: 10000,
                max: 20000,
                custNo: "6000001",
                custIdType: "居民身份证",
                custIdCard: "123445",
                custPhone: "13345654569",
                branch: "兴业银行郑州紫荆山路支行",
                loginWay: "6000001",
                loginIp: "192.168.1.137",
                lastLogin: "2020-12-30 15:41:21"
            },
            list: arr,
            total: arr.length,
            hasList: arr2,
            usedList: arr3,
            expiredList: arr4,
        },
    };
})
//获取权益页面tableList
Mock.mock("/mock/profitList", 'post', function (option) {
    const value = JSON.parse(option.body).value
    const randomNumber = () => {
        return parseInt(Math.random() * 1000)
    }
    let arr = []
    if (value === "4") {
        for (let i = 0; i < 20; i++) {
            arr.push({
                usedRank: randomNumber(),
                profitType: Math.round(Math.random() * 2),
                containCount: randomNumber(),
                use: randomNumber(),
                get: randomNumber(),
                rate: parseInt(Math.random() * 100) + "%",
                key: i + 1
            })
        }
    } else if (value === "5") {
        for (let i = 0; i < 12; i++) {
            arr.push(randomNumber())
        }
    } else {
        for (let i = 0; i < 20; i++) {
            arr.push({
                profitCost: randomNumber(),
                profitRelate: randomNumber(),
                profitUsetime: "2023/10/19 17:40",
                profitAddr: "北京",
                profitCard: randomNumber(),
                profitPay: randomNumber(),
                profitStatus: Math.round(Math.random() * 5),
                key: i + 1
            })
        }
    }
    return {
        code: 200,
        data: {
            list: arr,
            total: arr.length
        },
    };
})
//查询权益企业视图数据
Mock.mock("/mock/companyProfitInfo", 'get', function (option) {
    const randomNumber = () => {
        return parseInt(Math.random() * 1000)
    }
    let arr = []
    let arr2 = []
    let arr3 = []
    let arr4 = []
    for (let i = 0; i < 20; i++) {
        arr.push({
            profitCost: randomNumber(),
            profitRelate: randomNumber(),
            profitUsetime: "2023/10/19 17:40",
            profitAddr: "北京",
            userId: randomNumber(),
            profitCard: randomNumber(),
            profitPay: randomNumber(),
            profitStatus: Math.round(Math.random() * 5),
            key: i + 1
        })
        arr2.push({
            time: "2024-02-16",
            rate: parseInt(Math.random() * 5)
        })
        arr3.push({
            time: "2024-02-16",
            rate: parseInt(Math.random() * 5)
        })
        arr4.push({
            time: "2024-02-16",
            rate: parseInt(Math.random() * 5)
        })
    }
    return {
        code: 200,
        data: {
            companyInfo: {
                companyName: "上海XXX股份有限公司",
                companyRank: "1级",
                custNo: "E123",
                branch: "兴业银行上海浦东新区支行",
            },
            list: arr,
            total: arr.length,
            hasList: arr2,
            usedList: arr3,
            expiredList: arr4,
        },
    };
})
let array = []
const randomNumber = () => {
    return parseInt(Math.random() * 1000)
}
for (let i = 0; i < 20; i++) {
    array.push({
        customerId: randomNumber(),
        customerName: "成员名称",
        customerPhone: randomNumber(),
        customerIdtype: randomNumber(),
        customerIdcard: randomNumber(),
        key: i + 1
    })
}
//获取企业视图页面tableList
Mock.mock("/mock/companyProfitList", 'post', function (option) {
    const value = JSON.parse(option.body).value
    const randomNumber = () => {
        return parseInt(Math.random() * 1000)
    }
    let arr = []
    if (value === "1") {
        for (let i = 0; i < 20; i++) {
            arr.push({
                profitCost: randomNumber(),
                profitRelate: randomNumber(),
                profitUsetime: "2023/10/19 17:40",
                userId: randomNumber(),
                profitCard: randomNumber(),
                profitPay: randomNumber(),
                profitStatus: Math.round(Math.random() * 5),
                key: i + 1
            })
        }
    } else if (value === "2") {
        for (let i = 0; i < 20; i++) {
            arr.push({
                hasTime: "2023/10/19 17:40",
                getAll: randomNumber(),
                scoreBalance: randomNumber(),
                usedCount: randomNumber(),
                expiredCount: randomNumber(),
                frozenCount: randomNumber(),
                key: i + 1
            })
        }
    } else if (value === "3") {
        for (let i = 0; i < 20; i++) {
            arr.push({
                activityName: "活动名称",
                joinTime: "2023/10/19 17:40",
                status: Math.round(Math.random() * 2),
                spreadStatus: Math.round(Math.random() * 2),
                key: i + 1
            })
        }
    } else {
        arr = array
    }
    return {
        code: 200,
        data: {
            list: arr,
            total: arr.length
        },
    };
})
//删除功能
Mock.mock("/mock/deleteProfitList", 'post', function (option) {
    const params = JSON.parse(option.body)
    const index = array.findIndex(el => el.key === params.key)
    array.splice(index, 1)
    return {
        code: 200,
        data: {
            message: "删除成功"
        },
    };
})
//新增查询功能
Mock.mock("/mock/companyAddnewQuery", 'post', function (option) {
    const randomNumber = () => {
        return parseInt(Math.random() * 1000)
    }
    let arr = []
    for (let i = 0; i < 20; i++) {
        arr.push({
            customerId: randomNumber(),
            customerName: "客户名称",
            customerPhone: randomNumber(),
            customerIdtype: "身份证",
            customerIdcard: randomNumber(),
            key:i+1
        })
    }
    return {
        code: 200,
        data: {
            list:arr,
            total:arr.length
        },
    };
})
//新增功能
Mock.mock("/mock/companyAddnew", 'post', function (option) {
    const params = JSON.parse(option.body)
    array = [...params.arr,...array]
    array.forEach((el, index) => {
        el.key = index + 1
    })
    return {
        code: 200,
        data: {
            message: "新增成功"
        },
    };
})