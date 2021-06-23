const express = require('express')
const app = express()
const mongoose = require('mongoose')
// formidable模块
const formidable = require('express-formidable')
// 引入路径处理模块
const path = require('path')
// 跨域中间件
const cors = require('cors')
require('module-alias/register')
require('@utils/test.js')
// 加载全局js
require('./global.js')
// 连接数据库
mongoose
  .connect('mongodb://sqq:123.com@localhost:27017/chatroom', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('数据库连接成功'))
  .catch(() => console.log('数据库连接失败'))
// 开放跨域请求
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    alloweHeaders: [
      'Content-Type',
      'application/json;charset=utf-8;application/x-www-form-urlencoded'
    ]
  })
)
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')))
// 使用formidable处理请求参数
app.use(
  formidable({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为100M
    maxFileSize: 100 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
  })
)
// 路由
require('./routes')(app)
// 启动服务器
app.listen(3001, () => {
  console.log('监听3000端口...')
})
