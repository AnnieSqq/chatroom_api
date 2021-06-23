const { Friend } = require('@model/Friend')
const { User } = require('@model/User')
module.exports = async (req, res) => {
  const { add, added } = req.fields
  if (!add || !added) {
    return res.send({ code: '400', msg: '参数错误' })
  }
  await Friend.findOneAndDelete({ add, added })
  res.send({ code: '200', msg: '删除好友成功' })
  // 发送心跳通知
  // 如果对方不在散列表中，则创建离线散列表
  if (!heartMsg[added]) {
    heartMsg[added] = JSON.parse(defaultHeartMsg)
  }
  let addUser = await User.findOne({ username: add })
  heartMsg[added].addFriendMsg.push({
    username: add,
    nickname: addUser.nickname,
    type:'delete'
  })
}
