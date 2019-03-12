const Koa = require('koa2');
const app = new Koa();
const cors = require('koa2-cors')
const fs = require('fs');
const routers = require('./server/routers/index')

const config = require('./config')


// app.use(async ctx => {
 
//   ctx.body = ctx;
// });

app.use(cors())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port);