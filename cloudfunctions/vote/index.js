// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userInfo, result, type, wxUserInfo } = event
  console.log("wxUserInfo:" + JSON.stringify(wxUserInfo))
  console.log(result)
  console.log(type)
  console.log(userInfo)
  var returnCode = '1001'
  var voted = '1'
  //先查询该用户是否投过票
  await db.collection('voteInfo').where({
    openId: wxContext.OPENID,
    type: type
  }).get().then(res => {
    // res.data 包含该记录的数据
    console.log('查询数据')
    console.log(res.data)
    if(res.data.length==0){
      console.log('未投票过')
      voted = '0'
    }
  }).catch(res => {
      console.log('查询失败')
      console.log(res)
  })
  if(voted=='1'){
    returnCode='1002'
  }else{
    //记录投票信息
    await db.collection('voteInfo').add({
      data: {
        type: type,
        voteInfo: result,
        voteUserInfo: userInfo,
        wxUserInfo: wxUserInfo,
        openId: wxContext.OPENID,
        voteTime: new Date().getTime()
      },
    }).then(res => {
      console.log('成功')
      console.log(res)
      returnCode = '1000'
    }).catch(res => {
      console.log('失败')
      console.log(res)
    })
    //记录用户投票记录
    var id = wxContext.OPENID;
    var success = 0;
    if (type == 'vote2' && result[0] == '5') {
      success = 1;
    } else if (type == 'vote3' && result[0] == '保洁员') {
      success = 1;
    }
    var voteUserInfo = {
      openId: wxContext.OPENID,
      wxUserInfo: wxUserInfo,
      timeCost: new Date().getTime(),
      successCount: success
    }
    await db.collection('voteUser').where({
      openId: wxContext.OPENID
    }).get().then(res => {
      // res.data 包含该记录的数据
      console.log('查询数据')
      console.log(res.data)
      var resData = res.data
      if (resData.length == 0) {
        console.log('未投票过')
      }else{
        voteUserInfo.timeCost = resData[0].timeCost + voteUserInfo.timeCost
        voteUserInfo.successCount = resData[0].successCount+voteUserInfo.successCount
      }
    }).catch(res => {
      console.log('查询失败')
      console.log(res)
    })
    //记录数据
    await db.collection('voteUser').doc(id).set({
      data: voteUserInfo,
      success(res) {
        console.log(res.data)
      }
    })
  }
  console.log('结束' + returnCode)
  return {
    returnCode: returnCode
  }
}