// 创建路由
const chat = require('express').Router()
// 发送文本
chat.post('/text', require('./sendText'))
// 发送文件
chat.post('/filetext', require('./sendFile'))
// 发送图片
chat.post('/imgtext', require('./sendImg'))
// 上传文件
chat.post('/file', require('./uploadFile'))
// 获取聊天记录列表
chat.get('/list', require('./list'))
// 导出路由
module.exports = chat
