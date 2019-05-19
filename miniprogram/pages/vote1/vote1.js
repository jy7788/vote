import Toast from '../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['商场经理', '导购', '保洁员', '私人医生'],
    radio: '',
    userInfo: {},
    show: false,
    buttonDisable: false
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    console.log(event)
    this.setData({
      radio: event.detail
    });
  },
  vote(event) {
    console.log(this.data.radio);
    var result = [this.data.radio];
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'vote',
      // 传给云函数的参数
      data: {
        type: "vote1",
        result: result,
        wxUserInfo: this.data.userInfo
      },
      // 成功回调
      success(res) {
        console.log(res)
        var resultCode = res.result.returnCode
        if('1000'==resultCode){
          wx.redirectTo ({
            url: '../voteSucc/voteSucc',
          })
        } else if ('1002' == resultCode){
          wx.redirectTo({
            url: '../voted/voted',
          })
        }else{
          wx.navigateTo({
            url: '../voteFail/voteFail',
          })
        }
      },
      fail: err => {
        console.log('调用云函数失败')
        console.error(err)
        wx.navigateTo({
          url: '../voteFail/voteFail',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        var a = false
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("用户信息:" + JSON.stringify(res.userInfo))
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }else{
          console.log("用户未授权")
          // 用户未授权时引导授权
          wx.showModal({
            title: '是否授权用户信息',
            content: '需要获取您的用户信息，请确认授权，否则无法使用投票',
            success: function (tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userInfo"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      // this.setData({ buttonDisable: true });
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
              if (tip.cancel) {
                console.log("run fail", tip)
                // vm.locationText = '全国'
              }
            }
          })
        }
        }
    })
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