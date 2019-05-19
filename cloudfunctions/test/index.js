// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init() //初始化云函数
const db = cloud.database()
const _ = db.command
// 云函数入口函数
//event:触发云函数的事件
exports.main = async (event, context) => {
  const { OPENID, APPID, UNIONID } = cloud.getWXContext()
  const { userInfo, result } = event
  console.log(result)
  return {
    OPENID,
    APPID,
    UNIONID,
  }
}