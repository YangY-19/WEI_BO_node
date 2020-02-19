/**
 * @description 单元测试、
 * @author YangY
 */

const request = require('supertest')
const server = require('../app').callback()

module.exports = request(server)