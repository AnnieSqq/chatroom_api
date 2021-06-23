const { User } = require('@model/User')
const { Friend } = require('@model/Friend')
module.exports = async (req, res) => {
  if (!req.query.keyword) {
    return res.send({ code: '400', msg: '参数错误' })
  }
  const reg = new RegExp(req.query.keyword, 'i')
  let query = {
    $or: [{ username: { $regex: reg } }, { nickname: { $regex: reg } }]
  }
  const users = await User.find(query)
  const data = []
  for (let i = 0; i < users.length; ++i) {
    const e = users[i]
    const friend = await Friend.findOne({
      add: req.headers.username,
      added: e.username
    })
    data.push({
      username: e.username,
      nickname: e.nickname,
      online: e.online,
      isFriend: !!friend
    })
  }
  res.send({
    code: '200',
    msg: '搜索用户成功',
    data: data
  })
}
