const { User } = require('@model/User')
const { Friend } = require('@model/Friend')
module.exports = async (req, res) => {
  // 判断参数是否正确
  if (!(req.fields.username && req.fields.password)) {
    return res.send({ code: '400', msg: '登录信息不标准' })
  }
  if (req.fields.username == 'sys') {
    return res.send({ code: '400', msg: '系统用户不能登录' })
  }
  const user = await User.findOneAndUpdate(
    {
      username: req.fields.username,
      password: req.fields.password
    },
    { $set: { online: true } }
  )
  if (!user) {
    return res.send({ code: '400', msg: '用户名或密码有误' })
  }
  // 登录成功
  // 首先，通知所有散列表中的用户：我上线了
  for (username in heartMsg) {
    // 离线的不发
    if (!heartMsg[username].online) {
      continue
    }
    const friend = await Friend.findOne({
      add: heartMsg[username].username,
      added: user.username
    })
    // 不是好友的也不发
    if (!friend) {
      continue
    }
    heartMsg[username].onlineChangeList.push({
      username: user.username,
      nickname: user.nickname,
      type: 'login'
    })
  }
  // 然后，用户进入消息散列表
  // 如果已经存在，就把online改为true
  if (!heartMsg[user.username]) {
    heartMsg[user.username] = JSON.parse(defaultHeartMsg)
  }
  heartMsg[user.username].online = true

  res.send({
    code: '200',
    msg: '登录成功',
    data: {
      username: user.username,
      nickname: user.nickname,
      id: user._id
    }
  })
}
