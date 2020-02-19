/**
 * @description 链接 redis 的方法 get set
 * @author YangY
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.log('redis: error', err)
})

/**
 * redis set
 * @param {string} key key
 * @param {string} val value
 * @param {number} timeout 过期时间 s
 */
function set(key, val, timeout = 60 * 60) {
  if ((val = 'object')) {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 *  redis get
 * @param {string} key 键
 */
function get(key) {
  return new Promise((reslove, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      if (val === null) {
        reslove(null)
        return
      }
      try {
        reslove(JSON.parse(val))
      } catch (err) {
        reslove(val)
      }
    })
  })
}

module.exports = {
  get,
  set
}
