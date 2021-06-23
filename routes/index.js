const { User } = require('@model/User')
module.exports = (app) => {
  // 拦截器
  app.all('/*', async (req, res, next) => {
    if (
      req.url != '/user/register' &&
      req.url != '/user/login' &&
      req.url != '/chat/file' &&
      req.url.split('/')[1] != 'public' &&
      req.url.split('/')[1] != 'uploads'
    ) {
      const { username, id } = req.headers
      const user = await User.findOne({ username, _id: id })
      if (!user) {
        return res.send({
          code: '400',
          msg: '用户参数不正确'
        })
      }
    }
    next()
  })
  // 测试
  app.use('/test', require('./test.js'))
  // 用户相关请求
  app.use('/user', require('./user'))
  // 好友相关请求
  app.use('/friend', require('./friend'))
  // 聊天相关请求
  app.use('/chat', require('./chat'))
}
