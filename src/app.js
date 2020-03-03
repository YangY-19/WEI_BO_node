const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const bodyParser = require('body-parser');
//handle request entity too large

const InitRouter = require('./cache/_whenLoadRouter')
// const index = require('./routes/index')
// const userApiRouter = require('./routes/api/users')
// const userViewRouter = require('./routes/view/user')
const { REDIS_CONF } = require('./conf/db')

// error handler //错误提升到页面
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public')) //将public目录变成静态目录

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// app.use(bodyParser.json({limit:'50mb'}));
// app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

//session 配置 加密
app.keys = ['Uisdf_12@//#end']
app.use(
  session({
    key: 'weibo_sid', //cookie name mor是 'koa_sid'
    prefix: 'weibo:sess', //redis key 的前缀 默认是 'koa:sess
    cookie: {
      path: '/', //所有目录给可以访问
      httpOnly: true, //客服端无权修改 Userid
      maxAge: 24 * 60 * 60 * 1000 //ms 过期时间
    },
    // ttl:  //redis过期时间, 不写默认与 maxAge 相同
    store: redisStore({
      //把信息存放到redisStore里
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
InitRouter.initLoadRouters(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
