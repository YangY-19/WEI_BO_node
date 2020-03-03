/**
 * @description User API 路由
 * @author YangY
*/


const Router = require('koa-router')
const { isExist, register, login, verify, deleteCurUser, changeInfo, changePassword, getUserInfo, logout} = require('../../controller/user')
const doCrypto = require('../../utils/cryp')
const userValidata = require('../../validator/user')
const { getValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')
const router = new Router({
  prefix: '/weibo/user'
}) 

//用户注册
router.post('/register', getValidator(userValidata), async ctx => {
  const {nickName, userName, password, gender} = ctx.request.body
  ctx.body = await register({nickName, userName, password, gender})
})

//用户名/昵称 是否存在
router.post('/isExist', async ctx => {
  const { nickName, userName } = ctx.request.body
  ctx.body = await isExist({ nickName, userName })
})

//登录接口
router.post('/login', async ctx => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, doCrypto(password))
})

//验证登录接口
router.post('/verifyLogin', async ctx => {
  ctx.body = await verify(ctx)
})

//删除接口
router.post('/delete', loginCheck, async ctx => {
   if (isTest) {
     const { userName } = ctx.session.userInfo
     ctx.body = await deleteCurUser(userName)
   }
})

//根据id查询用户信息
router.get('/getUserInfo/:userId', loginCheck, async ctx => {
  if (isTest) {
    const { userId } = ctx.params
    ctx.body = await getUserInfo(userId)
  }
})

//修改个人信息   
router.patch('/changeInfo', loginCheck, getValidator(userValidata), async ctx => {
   const { nickName, city, pictureInfo } =  ctx.request.body
   ctx.body = await changeInfo({ctx, nickName, city, pictureInfo})
})

//修改密码
router.patch('/changePassword', loginCheck, getValidator(userValidata), async ctx => {
  const { password, newPassword } =  ctx.request.body
  ctx.body = await changePassword(ctx, password, newPassword)
})

//退出登录
router.post('/logout', loginCheck, async ctx => {
  ctx.body = await logout(ctx)
})
module.exports = router
