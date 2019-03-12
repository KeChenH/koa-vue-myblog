const userModel = require('../models/user');
const user = {
    async getAll(formData){
        let resultData = await userModel.getAllBlogs(formData)
        return resultData
    },
    async login(formData) {
        let resultData = await userModel.getOneByUserNameAndPassword({
            'password': formData.password,
            'username': formData.userName
        })
        return resultData
    }
}

module.exports = user