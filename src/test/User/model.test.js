/**
 * @description user model 测试
 * @author YangY
*/

const { User } = require('../../db/model/index')

test('User 模型的各个属性,符合预期', () => {
   const user = User.build({ //构建一条数据,不会提交到数据库
      userName: '13456785678',
      password: 'p123456',
      nickName: 'YangY',
      picture: '/xxx.png',
      city: '北京'
   })
   //验证各个属性
   expect(user.userName).toBe('13456785678')
   expect(user.password).toBe('p123456')
   expect(user.nickName).toBe('YangY')
   expect(user.gender).toBe(3)
   expect(user.picture).toBe('/xxx.png')
   expect(user.city).toBe('北京')
})