const Koa = require('koa2');
const app = new Koa();
const cors = require('koa2-cors')
const fs = require('fs');
const koaBody = require('koa-body')
const routers = require('./server/routers/index')

const config = require('./config')


app.use(cors())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.use(koaBody({
    multipart: true, // 支持文件上传
}))

app.listen(config.port);