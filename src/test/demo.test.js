/**
 * @description 单元测试、
 * @author YangY
 */

 const server = require('./server')

 function sun(a,b){
     return a + b
 }

 test('10 + 20 应该对于 30', () => {
     const res = sun(10, 20)
     expect(res).toBe(30)
 })

test('json 接口返回数据格式', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})

// test('json 接口返回数据格式', async () => {
//     const res = await server.post('/json').send({
//         userName:'zs'
//     })
//     expect(res.body).toEqual({
//         title: 'koa2 json'
//     })
//     expect(res.body.title).toBe('koa2 json')
// })