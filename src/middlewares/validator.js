/**
 * @description schema 验证中间件
 * @author YangY
*/
const { ErrorModel } = require('../model/ResModel')

function getValidator(validate) {
   async function validator(ctx, next) {
       const data = ctx.request.body
       const err = validate(data)
       if (err) {
           ctx.body = new ErrorModel({
               code:10003,
               message: err
           })
           return
       }
       await next()
   }
   return validator
}

module.exports = {
    getValidator
}