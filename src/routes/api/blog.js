/**
 * @description 微博 model
 * @author YangY
*/

const Router = require('koa-router')
const { create, getProfileBlogList, getSquareBlogList } = require('../../controller/blog')
const { loginCheck } = require('../../middlewares/loginChecks')
const router = new Router({
    prefix: '/weibo/blog'
})

//创建围脖
router.post('/create', loginCheck, async ctx => {
    const {content, imageList, city} = ctx.request.body
    ctx.body = await create({ctx, content, imageList, city})
})

//个人主页
router.get('/profile', loginCheck, async ctx => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/weibo/blog/profile/${userName}`)
})

router.get('/profile/:userName', loginCheck, async ctx => {
    const { userName: curUserName } = ctx.params
    ctx.body = await getProfileBlogList(curUserName)
})

//加载更多
router.get('/profile/loadMore/:userName/:pageIndex', loginCheck, async ctx => {
    const { userName, pageIndex } = ctx.params
    ctx.body = await getProfileBlogList(userName, pageIndex)
})

//广场
router.get('/square', loginCheck, async ctx => {
    ctx.body = await getSquareBlogList()
})
//加载更多
router.get('/square/loadMore/:pageIndex', loginCheck, async ctx => {
    const { pageIndex } = ctx.params
    ctx.body = await getSquareBlogList(pageIndex)
})

module.exports = router