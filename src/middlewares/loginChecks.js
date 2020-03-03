/**
 * @description 登录验证中间件
 * @author YangY
*/

const { ErrorModel } = require('../model/ResModel')

/**
 * API 登录验证
 * @param {*} ctx
 * @param {*} next
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel({
        code: 10003,
        message: '请先登录!'
    })
}

module.exports = {loginCheck}