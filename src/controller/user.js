/**
 * @description user 业务逻辑
 * @author YangY
*/

const { getUserInfo, createUser, deleteUser, updataUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { saveFile } = require('./utils')
const doCrypto = require('../utils/cryp')
/**
 * 验证用户名/昵称是否存在
 * @param {} userName 用户名
 * * @param {} nickName 昵称
 */

async function isExist({userName, nickName}) {
    let userInfo = await getUserInfo({userName, nickName})
    if (userInfo) {
        if(userName) return new ErrorModel({
            code: 10003,
            message: '用户名已存在,请重新选取用户名'
        })
        if(nickName) return new ErrorModel({
            code: 10003,
            message: '昵称已存在,请重新选取用户名'
        })
    } else {
        if(userName) return new SuccessModel('验证通过')
        if(nickName) return new SuccessModel('验证通过')
    }
}

/**
 * 注册验证
 * @param {string, string, numer} {userName, password, gender}
 */
async function register ({nickName, userName, password, gender} ) {
    let userInfo = await getUserInfo({userName})
    if (userInfo) {
        return new ErrorModel({
            code: 10003,
            message: '用户已存在'
        })
    } else {
        try {
           await createUser({nickName, userName, password: doCrypto(password), gender})
           return new SuccessModel('注册成功!')
        } catch (ex) {
            return new ErrorModel({
                code: 10003,
                message: '注册失败!'
            })
        }
    }
}

/**
 * 登录验证
 * @param {*} ctx
 * @param {*} userName
 * @param {*} password
 * @returns
 */
async function login(ctx, userName, password) {
    let user = await getUserInfo({userName})
    let userInfo = await getUserInfo({userName, password})
    //判断用户是否存在
    if (!user) {  
        return new ErrorModel({
            code: 10003,
            message: '登录失败,用户不存在,请先注册!'
        })
    }
    //判断用户账号密码是否正确
    if (!userInfo) {
        return new ErrorModel({
            code: 10003,
            message: '密码错误!'
        })
    }
    
    ctx.session.userInfo = userInfo
    return new SuccessModel('登录成功!')
}

/**
 * 验证是否已登录
 * @param {*} ctx
 * @returns
 */
function verify(ctx) {
    let data = {
        isLogin: false
    }
    const userInfo = ctx.session.userInfo
    debugger
    if (userInfo) {
        data = {
            isLogin: true,
            nickName: userInfo.nickName
        }
    }
    return new SuccessModel(data)
}

/**
 * 删除当前用户
 * @param {string} userName
 */
async function deleteCurUser(userName) {
   const result = deleteUser(userName)
   console.log("result > 0", result)
   if (result) {
       return new SuccessModel()
   }
   return new ErrorModel({
       code: 10003,
       message: '删除信息失败！'
   })
}

/**
 * 修改当前用户信息
 * @param {string} { nickName, city, pictureInfo }
 */
async function changeInfo ({ctx, nickName, city, pictureInfo }) {
    const { thumbUrl, name ,size } = pictureInfo
    const { userName } = ctx.session.userInfo
    const catalogue = 'profile'
    const profilePath = await saveFile(thumbUrl, name, size, catalogue)
    let params = {userName, city, profilePath}
    if (nickName) {
       Object.assign(params, {nickName})
    }
    const result = await updataUserInfo({userName},params)
    if (result) {
        return new SuccessModel('修改成功')
    } 
    return new ErrorModel({
        code: 10003,
        message: '修改成功失败！'
    })
}

/**
 * 修改密码
 * @param {*} ctx
 * @param {*} password
 * @param {*} newPassword
 * @returns
 */
async function changePassword(ctx, password, newPassword) {
    const { userName } = ctx.session.userInfo
    const userInfo = await getUserInfo({userName, password: doCrypto(password)})
    if(!userInfo) {
        return new ErrorModel({
            code: 10003,
            message: '原密码不正确!'
        })
    }
    if(doCrypto(userInfo.password) === doCrypto(newPassword)) {
        return new ErrorModel({
            code: 10003,
            message: '原密码与旧密码相同!'
        })
    }
    const result = await updataUserInfo({userName, password:doCrypto(password)}, {newpassword:doCrypto(newPassword)})
    if (result) {
        return new SuccessModel('修改成功')
    } 
    return new ErrorModel({
        code: 10003,
        message: '修改成功失败！'
    })
}

/**
 * 退出登录
 * @param {*} ctx
 * @returns
 */
async function logout(ctx) {
   delete ctx.session.userInfo
   return new SuccessModel('退出成功！')
}

/**
 * 获取用户信息
 * @param {*} userId
 */
async function getuserInfo(userId) {
   const result =  await getUserInfo({userId})
   if(result) {
    return new SuccessModel(result)
   }
   return new ErrorModel({
    code: 10003,
    message: '无该用户信息!'
})
}

module.exports = {
    isExist,
    register,
    login,
    verify,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout,
    getuserInfo
}