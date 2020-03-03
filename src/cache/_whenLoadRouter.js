/**
 * @description 注册src/routes/api下的所有路由
 * @author YangY
 */

const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitRouter {
      static initLoadRouters (app) {
        const apiDirectory = `${process.cwd()}/src/routes/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadRouter
          })

          function whenLoadRouter(obj) {
             if (obj instanceof Router ) {
              app.use(obj.routes(), obj.allowedMethods())
             }
          }
      }
}

module.exports = InitRouter