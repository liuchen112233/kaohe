import avatar from '@/assets/images/avatar.png'

const Mock = require('mockjs');
Mock.mock("/mock/login", 'post', function (option) {
    const params = JSON.parse(option.body)
    console.log(params);
    console.log(avatar);
    sessionStorage.setItem('username',params.username)
    return {
        code: 200,
        msg: "参数成功",
        data: {
            title: "信息标题",
            content: "登陆成功",
            data:{
                username:params.username,
                iconPath:avatar
            }
        },
    };
})

Mock.mock("/mock/getWorkdesk", 'get', function (option) {
    return {
        code: 200,
        data: {
            activity:{
                
            }
        },
    };
})