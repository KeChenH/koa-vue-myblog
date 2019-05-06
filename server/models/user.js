const db = require('../utils/db')
const user = {
     /**
     * 分页查询所有blogs
     */
    async getAllBlogs(options){
        let page = Number(options.page)
        let pageSize = Number(options.pageSize)

        let start = (page-1)*pageSize;
        let end = start+pageSize

        let result = await db.findDataByPage('t_contents',start,end)
      
        return result
    },
    /**
     * 根据用户名和密码查找用户
     */
    async getOneByUserNameAndPassword(options) {
        let _sql = `
        SELECT * from t_users
          where password="${options.password}" and username="${options.username}"`
        let result = await db.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    }
}

module.exports = user