const { Message } = require('@model/Message')
module.exports = async (req, res) => {
  console.log(heartMsg)
  let username = req.headers.username
  if (!heartMsg[username]) {
    return res.send({ code: '400', msg: '账号有误，请重新登录' })
  }
  // 在线状态改变的通知
  let onlineText = ''
  for (i in heartMsg[username].onlineChangeList) {
    let e = heartMsg[username].onlineChangeList[i]
    if (e.type == 'login') {
      onlineText += e.nickname + '上线啦！\n'
    } else if (e.type == 'logout') {
      onlineText += e.nickname + '下线啦！\n'
    }
  }
  // 收到的消息通知
  let chatText = ''
  for (u in heartMsg[username].msgList) {
    let nick = heartMsg[username].msgList[u][0].sender.nickname
    chatText += nick + '发来了消息，快去看看吧！\n'
  }
  // 添加好友的消息通知
  let friendText = ''
  for (i in heartMsg[username].addFriendMsg) {
    let e = heartMsg[username].addFriendMsg[i]
    if (e.type == 'add') {
      friendText += e.nickname + '添加了你为好友\n'
    } else if (e.type == 'delete') {
      friendText += e.nickname + '删除了你这位好友\n'
    }
  }
  // 消息结合
  let systext = onlineText + chatText + friendText
  if (systext) {
    const message = new Message({
      sender: 'sys',
      receiver: username,
      type: 'text',
      content: systext
    })
    await message.save()
  }
  let hasMsg = !!systext
  res.send({
    code: '200',
    msg: '联络成功',
    data: { ...heartMsg[username], hasMsg }
  })
  heartMsg[username] = {
    // 在线状态改变的好友列表
    onlineChangeList: [],
    // 收到的消息列表
    msgList: {},
    // 添加好友的消息
    addFriendMsg: [],
    // 是否在线
    online: true
  }
}
