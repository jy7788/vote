// miniprogram/pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    queen_manager:0,
    queen_guide:0,
    queen_doctor:0,
    queen_cleaner:0,
    active: 0,
    userInfo: {},
    rankArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database()
    db.collection('voteInfo').where({
      type: 'vote1'
    }).get().then(res => {
      // 投票结果统计
      console.log(res.data)
      var voteCount = res.data.length
      var dataArr = res.data
      var queen_manager_num = 0
      var queen_guider_num = 0
      var queen_doctor_num = 0
      var queen_cleaner_num = 0
      console.log(voteCount)
      for (var i = 0; i < dataArr.length; i++) {
        console.log(dataArr[i])
        var tmpArr = dataArr[i].voteInfo
        console.log("tmpArr[0]:" + tmpArr[0])
        if (tmpArr[0] == 'queen_manager') {
          queen_manager_num = queen_manager_num + 1;
        } else if (tmpArr[0] == 'queen_guide') {
          queen_guider_num = queen_guider_num + 1;
        } else if (tmpArr[0] == 'queen_doctor') {
          queen_doctor_num = queen_doctor_num + 1;
        } else if (tmpArr[0] == 'queen_cleaner') {
          queen_cleaner_num = queen_cleaner_num + 1;
        }
      }
      if (voteCount > 0) {
        this.setData({
          queen_manager: parseInt(queen_manager_num / voteCount * 100),
          queen_guide: parseInt(queen_guider_num / voteCount * 100),
          queen_doctor: parseInt(queen_doctor_num / voteCount * 100),
          queen_cleaner: parseInt(queen_cleaner_num / voteCount * 100)
        });
      }
      console.log("胶囊排名:" + this.data.queen_cleaner)
    }).catch(res => {
      console.log('查询失败')
      console.log(res)
    })

    //获取投票排名
    db.collection('voteUser').limit(10).orderBy(
      'successCount', 'desc'
    ).orderBy(
      'timeCost', 'asc'
    ).get().then(res => {
      // 投票前十名的数据
      console.log("前十名:" + JSON.stringify(res.data))
      var rankArr = []
      for (var i = 0; i < res.data.length; i++) {
        rankArr.push(res.data[i])
      }
      this.setData({
        rankArr: rankArr
      })
      console.log("url:" + JSON.stringify(this.data.rankArr))
    }).catch(res => {
      console.log('查询失败')
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
