const Router = require("koa-router")();
const userController = require("../controllers/user");

const routers = Router
  .get("/getAll", userController.getAll)
  .post("/login", userController.login);

module.exports = routers