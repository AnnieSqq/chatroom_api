// 创建路由
const user = require('express').Router()
/**
 * 注册
 * username: String
 * password: String
 */
user.post('/register',require('./register'))
/**
 * 登录
 * username: String
 * password: String
 * 返回：
 * id
 * username
 * nickname
 */
user.post('/login',require('./login'))
/**
 * 登出
 * id
 */
user.get('/logout',require('./logout'))
/**
 * 更新用户信息
 * id
 * nickname
 * password
 */
user.post('/update',require('./update'))
/**
 * 心跳
 * id
 * 返回：
 * 通知列表：
 * 好友上线列表online
 * 好友下线列表offline
 * 好友消息列表chats
 * 好友申请列表add
 */
user.get('/heart',require('./heart'))
// 导出路由
module.exports = user
