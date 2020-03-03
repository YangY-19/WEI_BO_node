
const Router = require('koa-router')
// const router = new Router()
const router = new Router({
    prefix: '/view'
  }) 

/**
 *  获取登录信息
 * @param {*} ctx
 * @returns
 */
function getLoginInoffensive(ctx) {
    let data = {
        isLogin: false
    }
    const userInfo = ctx.session.userInofo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.nickName
        }
    }
    return data
}

router.get('/login2', async ctx => {
    ctx.body = getLoginInoffensive(ctx)
})

router.post('/register', async ctx => {
    ctx.body = getLoginInoffensive(ctx)
})

module.exports = router