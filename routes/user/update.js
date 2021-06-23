const { User } = require('@model/User')
module.exports = async (req, res) => {
  if (!req.fields.newNickName) {
    return res.send({ code: '400', msg: '参数不对' })
  }
  await User.findByIdAndUpdate(req.headers.id, {
    $set: { nickname: req.fields.newNickName }
  })
  res.send({code:'200',msg:'修改昵称成功'})
}
