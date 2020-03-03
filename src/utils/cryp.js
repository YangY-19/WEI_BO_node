/**
 * @description 加密方法
 * @author YangY
*/

const crypto= require('crypto')
const { CRYPTO_KEY } = require('../conf/secretKeys')

/**
 * 加密
 * @param {*} content 明文
 */
function _md5(content) {
   const md5 = crypto.createHash('md5')
   return md5.update(content).digest('hex')
}

function doCrypto(content) {
   const str = `password=${content}&key=${CRYPTO_KEY}`
   return _md5(str)
}



module.exports = doCrypto   
