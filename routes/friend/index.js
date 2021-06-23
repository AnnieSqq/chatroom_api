// 创建路由
const friend = require('express').Router()
// 添加好友
friend.post('/add', require('./add'))
// 删除好友
friend.post('/delete', require('./delete'))
// 搜索用户
friend.get('/search', require('./search'))
// 好友列表
friend.get('/list', require('./list'))
// 导出路由
module.exports = friend
