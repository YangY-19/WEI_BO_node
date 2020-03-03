/*
 * @description user 业务逻辑
 * @author YangY
*/

const { createBlog, getBlogListByUser } = require('../services/blog')
const { saveFile } = require('./utils')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 *  创建围脖
 * @param {string} {ctx, content, imageList, city}
 * @returns
 */
async function create({ctx, content, imageList, city}) {
    const {id: userId} = ctx.session.userInfo
    let imagePaths = []
    if(imageList) {
        let imagePath
        let catalogue = 'blog'
        for (let i = 0; i < imageList.length; i++) {
            imagePath = await saveFile( imageList[i].thumbUrl, imageList[i].name, imageList[i].size, catalogue )   
            imagePaths.push(imagePath)
        }
    }
    const images = imagePaths.join(",")
    const blog = await createBlog({userId, content, images, city })
    if (blog) {
        return new SuccessModel('发布成功!')
    }
    return new ErrorModel({
        code: 10003,
        message: '发布失败!'
    })
}

/**
 * 获取围脖列表
 * @param {string} userName
 * @param {number} [pageIndex=0]
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser(userName, pageIndex, pageSize = PAGE_SIZE)
    const blogList = result.blogList

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

/**
 *  获取广场
 * @param {number} [pageIndex=0]
 */
async function getSquareBlogList(pageIndex = 0) {
    const userName = undefined
    const result = await getBlogListByUser(userName, pageIndex)
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    create,
    getProfileBlogList,
    getSquareBlogList
}