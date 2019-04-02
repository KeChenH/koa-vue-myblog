const userService = require('../services/user')
const jwt = require('jsonwebtoken')
const secret = require('../utils/secret.json');

module.exports = {
    async getAll(ctx) {
        let req = ctx.request;
        let params = req.query;
        let result = {
            code: -1,
            success: false
        }
        let userResult = await userService.getAll(params);
        if (userResult) {
            result.code = 0;
            result.data = userResult
        }
        ctx.body = result;
    },

    async login(ctx) {
        let formData = await parsePostData(ctx)
        let result = {
            code: 1,
            success: false
        }
        try {
            let userResult = await userService.login(formData);
            if (userResult) {
                let payload = {
                    userName: userResult.username,
                    time: new Date().getTime(),
                    timeout: 10
                }
                let token = jwt.sign(payload, secret.sign, { expiresIn: "5s" });

                result.code = 0
                result.success = true
                result.data = {
                    token: token,
                    user: userResult.screen_name
                }

            }
            ctx.body = result;
        } catch (err) {
            return Promise.reject(err)
        }

    }
}

// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end", function () {
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    // console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}