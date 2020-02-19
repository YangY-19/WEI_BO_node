/**
 * @description User API 路由
 * @author YangY
*/


const Router = require('koa-router')
const { isExist } = require('../controller/user')

const router = new Router({
  prefix: '/user'
}) 

//用户注册
router.post('/register', async ctx => {
  const { } = ctx.request.body
})

//用户名/昵称 是否存在
router.post('/isExist', async ctx => {
  const { nickName, userName } = ctx.request.body 
  debugger
  const data = await isExist({ nickName, userName })
  ctx.body = data
})

router.get('/isExist2', async ctx => {
  ctx.body = '11111111111111'
})
// //昵称是否存在
// router.post('/nickNameIsExist', async ctx => {
//   const { } = ctx.request.body
// })


module.exports = router
