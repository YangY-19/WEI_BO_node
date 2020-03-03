/**
 * @description  user 数据格式校验
 * @author YangY
*/

const validate = require('./_validate')
//校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            maxLength: 11,
            minLength: 11
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 6
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255,
        },
        picture: {
            type: 'string',
            maxLength: 255,
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'string',
        }
    }
}

//执行校验
function userValidate(data={}) {
    return validate(SCHEMA, data)
}

module.exports = userValidate
