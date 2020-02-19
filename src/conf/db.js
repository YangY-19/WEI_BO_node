/**
 * @description 存储配置
 * @author YangY
 */

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'ldy998326',
  port: '3306',
  database: 'weibo'
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
