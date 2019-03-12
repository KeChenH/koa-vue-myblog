const userService = require('../services/user')
module.exports = {
    async getAll(ctx) {
        let req = ctx.request;
        let params = req.query;
        let result = {
            code: -1,
            success: false
        }
        let userResult = await userService.getAll(params);
        if(userResult){
            result.code = 0 ;
            result.data = userResult
        }
        ctx.body = result;
    },

    async login(ctx) {
        let formData = ctx.req;

        let result = {
            code: '',
            success: false
        }
        let userResult = await userService.login(formData);
        if (userResult) {
            if (formData.username === userResult.username) {
                result.success = true
            }
        }
        ctx.body = result;
    }
}