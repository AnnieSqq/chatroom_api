const { User } = require('@model/User')
module.exports = async (req, res) => {
  // 判断参数
  if (!(req.fields.username && req.fields.password)) {
    return res.send({ code: '400', msg: '注册信息不标准' })
  }
  //   判断是否已经存在这个用户名
  let user = await User.findOne({ username: req.fields.username })
  if (user) {
    return res.send({ code: '400', msg: '注册的用户名已存在' })
  }
  //   创建用户对象
  user = new User({
    username: req.fields.username,
    password: req.fields.password,
    nickname: req.fields.username
  })
  await user.save()
  res.send({
    code: '200',
    msg: '注册成功'
  })
}
