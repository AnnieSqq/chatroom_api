// 创建路由
const test = require('express').Router()
// 获取一些数据
test.post('/', async (req, res) => {
  res.send({
    code: '200',
    data: '获取数据成功啦'
  })
})
// 导出路由
module.exports = test
