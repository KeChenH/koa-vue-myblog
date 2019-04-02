const Router = require('koa-router')();
const user = require('./user')


Router.use('/user',user.routes(),user.allowedMethods());

module.exports = Router;