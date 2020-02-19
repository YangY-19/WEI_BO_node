/**
 * @description 数据格式化
 * @author YangY
*/
const { DEFAULT_PICTURE } = require('../conf/constant') 
/**
 *用户默认头像
 * @param {Object} obj 用户默认信息
 * @returns
 */
function _formatUserPicure(obj) {
    if(obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 
 * @param {Array | Object } list 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if(list instanceof Array) {
        list.map(_formatUserPicure)
    }
    //单个对象
    return _formatUserPicure(list)
}

module.exports = {
    formatUser
}