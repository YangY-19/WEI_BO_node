/**
 * @description user api test
 * @author YangY
*/

const server = require('../server')

//用户信息

const testUser = {
    userName:'13333333333',
    passWord:'l123456',
    nickName: '测试',
    gender: '1'
}
let COOKIE = ''

//注册
test('注册一个用户, 应该成功', async () => {
    const res = await server
        .post('/weibo/user/register')
        .send(testUser)
    expect(res.body.code).toBe(10000)
})

//重复注册
test('重复注册，应该失败', async () => {
    const res = await server
        .post('/weibo/user/register')
        .send(testUser)
    expect(res.body.code).not.toBe(10000)
})

//查询注册用户名是否存在
test('查询注册用户名应该存在 ', async () => {
    const res = await server
       .post('/weibo/user/isExist')
       .send({userName: testUser.userName})
    expect(res.body.code).not.toBe(10000)
})

//json schema 验证
test('json schema 验证， 注册应该失败 ', async() => {
    const res = await server
    .post('/weibo/user/register')
    .send({
        userName:'122',
        passWord:'5676',
        nickName: 'YANGY',
        gender: 'mail'
        })
expect(res.body.code).not.toBe(10000)
})

//登录 
test('登录，应该成功 ', async () => {
    const res = await server
        .post('/weibo/user/login')
        .send({
            userName: testUser.userName,
            passWord: testUser.passWord,
            })
    expect(res.body.code).toBe(10000)
    COOKIE = res.header['set-cookie'].join(';')
})

//删除 
test('删除，应该成功 ', async () => {
    const res = await server
        .post('/weibo/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.code).toBe(10000)
})

//再次查询，注册用户名应该不存在
test('删除之后， 查询注册用户名应该不存在 ', async () => {
    const res = await server
       .post('/weibo/user/isExist')
       .send({userName: testUser.userName})
    expect(res.body.code).toBe(10000)
})

  

