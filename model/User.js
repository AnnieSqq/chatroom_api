// 引入数据库
const mongoose = require('mongoose')
// 引入schema构造
const { Schema } = mongoose
// 建立模型
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})
// 创建模型
const User = mongoose.model('User', UserSchema)
// 导出
module.exports = {
  User
}
