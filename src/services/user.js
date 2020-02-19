/**
 * @description User service
 * @author YangY
*/

const User  = require('../db/model/User')
const { formatUser } = require('./_format')
/**
 *
 * @param {*} userName
 * @param {*} nickName
 * @param {*} password
 */
async function getUserInfo({userName, nickName, password}) {
    let whereOpt = {}
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

module.exports = {
    getUserInfo
}