const { Message } = require('@model/Message')
module.exports = async (req, res) => {
  const query = {
    $or: [
      { sender: req.headers.username, receiver: req.query.receiver },
      { sender: req.query.receiver, receiver: req.headers.username }
    ]
  }
  const messages = await Message.find(query)
  res.send({ code: '200', msg: '获取聊天列表成功', data: messages })
}
