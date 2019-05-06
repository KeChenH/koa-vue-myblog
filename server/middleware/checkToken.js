const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const secret = require('../utils/secret.json');
module.exports = async (ctx, next) => {
    let url = ctx.request.url;
    if (url == '/user/login') {
        await next();
    } else {
        // 规定token写在header 的 'autohrization' 
        let token = ctx.request.headers["authorization"];
        // 解码
        try {
            let payload = await verify(token.split(" ")[1], secret.sign);
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
        } catch (err) {
            console.log(err)
        }
    }


}