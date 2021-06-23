// 引入数据库
const mongoose = require('mongoose')
// 引入schema构造
const { Schema } = mongoose
// 建立模型
const MessageSchema = new Schema({
  sender: {
    type: String,
    required:true
  },
  receiver: {
    type: String,
    required:true
  },
  content: String,
  type: {
    type: String,
    enum: ['img', 'file', 'text']
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})
// 创建模型
const Message = mongoose.model('Message', MessageSchema)
// 导出
module.exports = {
  Message
}
