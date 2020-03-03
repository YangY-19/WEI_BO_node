/**
 * @description User service
 * @author YangY
*/

const User  = require('../db/model/User')
const { formatUser } = require('./_format')
/**
 * 查询用户
 * @param {*} userName
 * @param {*} nickName
 * @param {*} password
 */
async function getUserInfo({userId, userName, nickName, password}) {
    let whereOpt = {}
    if (userId) {
        whereOpt = Object.assign(whereOpt, {userId})
    }
    if (nickName) {
        whereOpt = Object.assign(whereOpt, {nickName})
    }
    if (userName) {
        whereOpt = Object.assign(whereOpt, {userName})
    }
    if (password) {
        whereOpt = Object.assign(whereOpt, {userName}, {password})
    }

    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }
    return formatUser(result.dataValues)
}

/**
 *创建用户
 * @param {string, string, numer, string} userName, password, gender = 3, nickName
 */
async function createUser({userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        nickName,
        gender,
        password
    })
    return result.dataValues
}

/**
 *删除用户
 * @param {string} userName
 */
async function deleteUser(userName) {
   const result = await User.destroy({
        where: {
            userName
        }
   })
   return result > 0
}

/**
 * 修改用户
 * @param {string} {nickName, city, profilePath}
 */
async function updataUserInfo({userName, password},{ nickName, city, newpassword, profilePath}) {
    debugger
    let updateDate = {}
    if (nickName) {
        updateDate.nickName = nickName
    }
    if (city) {
        updateDate.city = city
    }
    if (newpassword) {
        updateDate.password = newpassword
    }
    if (profilePath) {
        updateDate.picture = profilePath
    }

    let whereData = {
        userName
    }
    if(password) {
        whereData.password = password
    }
    debugger
    const result = await User.update(updateDate, {
        where: whereData
   }) 

  return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updataUserInfo
}