/**
 * @description blog service
 * @author YangY
*/

const { Blog, User }  = require('../db/model/index')

/**
 * 创建围脖
 * @param {*} {userId, content, images, city, date }
 * @returns
 */
async function createBlog({userId, content, images, city, date }) {
     let result = await Blog.create({
        userId, content, images, city, date 
     })
     return result
}

/**
 * 获取围脖列表
 * @param {string} {userName, pageIndex = 0, pageSize = 10}
 */
async function getBlogListByUser(userName, pageIndex = 0, pageSize = 10) {
   const userWhereOpts = {}
   if (userName) {
    userWhereOpts.userName = userName
   }
   debugger
   //查询
   const result = await Blog.findAndCountAll({
      limit: pageSize, //5条
      offset: pageSize * pageIndex, //去除前几条
      order: [
          ['id', 'desc']
      ],
      include: [
          {
            model: User,
            attributes: ['userName', 'nickName', 'picture'],
            where: userWhereOpts
          }
      ]
   })

   //result.conut 总分
   //result.rows 查询结果 

   debugger
   let blogList = result.rows.map(row =>  row.dataValues)
   if (blogList) {
     blogList.forEach(blogItem => {
        blogItem.user = blogItem.user.dataValues
      })
   }

   return {
       count: result.count,
       blogList
   }
}

module.exports = {
    createBlog,
    getBlogListByUser
}