const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify,jwt);
const secret = require('../utils/secret.json');

async function check(ctx, next) {
    let url = ctx.request.url;
    // 登录 不用检查
    if (url == "/user/login") await next();
    else {
        // 规定token写在header 的 'autohrization' 
        let token = ctx.request.headers["authorization"];
        // 解码
        let payload = await verify(token, secret.sign);
        let {
            time,
            timeout
        } = payload;
        let data = new Date().getTime();
        if (data - time <= timeout) {
            // 未过期
            await next();
        } else {
            //过期
            ctx.body = {
                status: 50014,
                message: 'token 已过期'
            };
        }
    }
}

module.exports = check