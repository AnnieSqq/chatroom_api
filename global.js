// 要发送的心跳消息
global.heartMsg = {}
// 默认的心跳信息格式
global.defaultHeartMsg = JSON.stringify({
  // 在线状态改变的好友列表
  onlineChangeList: [],
  // 收到的消息列表
  msgList: {},
  // 添加好友的消息
  addFriendMsg: [],
  // 是否在线
  online: false
})
