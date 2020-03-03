/**
 * @description 数据模型入口文件
 * @author YangY
*/

const User = require('../model/User');
const Blog = require('../model/Blog')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}