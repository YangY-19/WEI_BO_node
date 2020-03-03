/**
 * @description utils api 路由
 * @author YangY
*/

const Router = require('koa-router')
const { loginCheck } = require('../../middlewares/loginChecks')
const router = new Router({
    prefix: '/api/utils'
})


module.exports = router