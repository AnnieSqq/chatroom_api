module.exports = async (req, res) => {
  const user = await require('@utils/logout')(req.headers.id)
  if (!user) {
    return res.send({ code: '400', msg: '账号有问题' })
  } else {
    return res.send({ code: '200', msg: '退出登录成功' })
  }
}
