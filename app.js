const Koa = require('koa2');
const app = new Koa();
const cors = require('koa2-cors')
const fs = require('fs');
const routers = require('./server/routers/index')
const jwtKoa = require('koa-jwt')
const secret = require('./server/utils/secret.json')
const checkToken = require('./server/middleware/checkToken');


const config = require('./config')


app.use(cors())


app.use(
    jwtKoa({secret:secret.sign}).unless({
        path:[/^\/user\/login/]
    })
)
app.use(checkToken)




// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())



app.listen(config.port);