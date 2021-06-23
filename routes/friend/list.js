const { Friend } = require('@model/Friend')
const { User } = require('@model/User')
module.exports = async (req, res) => {
  const friends = await Friend.find({ add: req.headers.username })
  let data = {}
  for (i in friends) {
    let f = await User.findOne({ username: friends[i].added })
    data[f.username] = {
      username: f.username,
      nickname: f.nickname,
      online: f.online
    }
  }
  res.send({
    code: '200',
    msg: '获取好友列表成功',
    data: data
  })
}
