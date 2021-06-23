const { User } = require('@model/User')
const { Friend } = require('@model/Friend')
module.exports = async (myid) => {
  // 修改用户状态online为false
  const user = await User.findByIdAndUpdate(myid, { $set: { online: false } })
  // 首先，给所有散列表中的用户预备发送下线消息
  for (username in heartMsg) {
    // 不在线的不发
    if (!heartMsg[username].online) {
      continue
    }
    const friend = await Friend.findOne({
      add: username,
      added: user.username
    })
    // 不是好友的不发
    if (!friend) {
      continue
    }
    heartMsg[username].onlineChangeList.push({
      username: user.usernmae,
      nickname: user.nickname,
      type: 'logout'
    })
  }
  // 最后，账号移出散列表
  delete heartMsg[user.username]
  return user
}
