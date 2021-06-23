const { User } = require('@model/User')
const { Message } = require('@model/Message')
module.exports = async (req, res) => {
  // 首先，验证消息格式
  if (!req.fields.receiver || !req.fields.content) {
    return res.send({ code: '200', msg: '消息参数不对' })
  }
  // 接着，获取两人的用户对象
  const sender = await User.findById(req.headers.id)
  const receiver = await User.findOne({ username: req.fields.receiver })
  if (!sender || !receiver) {
    return res.send({ code: '200', msg: '消息参数不对' })
  }
  // 如果对方不在散列表中，则创建离线散列表
  if (!heartMsg[req.fields.receiver]) {
    heartMsg[req.fields.receiver] = JSON.parse(defaultHeartMsg)
  }
  // 然后，将消息放到心跳散列表中
  if (!heartMsg[req.fields.receiver].msgList[sender.username]) {
    heartMsg[req.fields.receiver].msgList[sender.username] = []
  }
  heartMsg[req.fields.receiver].msgList[sender.username].push({
    sender: { username: sender.username, nickname: sender.nickname },
    content: req.fields.content,
    type: 'text'
  })
  //   最后，将消息入库
  const message = new Message({
    sender: sender.username,
    receiver: req.fields.receiver,
    content:req.fields.content,
    type: 'text'
  })
  await message.save()
  res.send({ code: '200', msg: '发送消息成功' })
}
