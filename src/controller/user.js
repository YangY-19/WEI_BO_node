/**
 * @description user 业务逻辑
 * @author YangY
*/

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 验证用户名/昵称是否存在
 * @param {} userName 用户名
 * * @param {} nickName 昵称
 */

async function isExist({userName, nickName}) {
    let userInfo = await getUserInfo({userName, nickName})
    if (userInfo) {
        if(userName) return new ErrorModel({
            code: '10003',
            message: '用户名已存在,请重新选取用户名'
        })
        if(nickName) return new ErrorModel({
            code: '10003',
            message: '昵称已存在,请重新选取用户名'
        })
    } else {
        if(userName) return new SuccessModel('验证通过')
        if(nickName) return new SuccessModel('验证通过')
    }
}

module.exports = {
    isExist
}