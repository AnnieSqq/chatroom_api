// 引入数据库
const mongoose = require('mongoose')
// 引入schema构造
const { Schema } = mongoose
// 建立模型
const FriendSchema = new Schema({
  add: {
    type: String,
    required:true
  },
  added: {
    type: String,
    required:true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})
// 创建模型
const Friend = mongoose.model('Friend', FriendSchema)
// 导出
module.exports = {
  Friend
}
