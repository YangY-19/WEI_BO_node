/**
 * @description 微博 模型
 * @author YangY
*/

const sequelize = require('../sequelize')
const { STRING, TEXT, INTEGER } = require('../type.js')

const Blog = sequelize.define('blog', {
     userId: {
         type: INTEGER,
         allowNull: false,
         comment: '用户 ID'
     },

     content: {
         type: TEXT,
         allowNull: false,
         comment: '微博类容'
     },

     images: {
         type: STRING,
         comment: '图片地址'
     },
    city: {
        type: STRING,
        comment: '城市' 
    },
    introduce: {
        type: STRING,
        comment: '介绍' 
    }
})

module.exports = Blog

