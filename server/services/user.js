const userModel = require('../models/user');
const md5 = require('md5')
const user = {
    async getAll(formData){
        let resultData = await userModel.getAllBlogs(formData)
        return resultData
    },

    async login(formData) {
        let resultData = await userModel.getOneByUserNameAndPassword({
            'username': formData.username,
            'password': md5(formData.username+ formData.password)
        })
        return resultData
    }
}

module.exports = user