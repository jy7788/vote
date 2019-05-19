import Toast from '../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    avatarUrl: './user-unlogin.png',
    userInfo: {}
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onGotUserInfo(detail){
    this.join()
  },
  join(event){
    const db = wx.cloud.database()
    db.collection('voteStatus').doc('vote-identify').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        if("1"==res.data.gameStatus){
          wx.navigateTo({
            url: res.data.voteUrl,
          })
        }else{
          Toast('游戏还未开始!');
        }
      },
      fail: err => {
        console.error('调用失败', err)
        this.setData({ show: true })
      }
    })
  },
  onClose() {
    this.setData({ show: false });
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