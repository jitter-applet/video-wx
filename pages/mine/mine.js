const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",

  },

  onLoad: function (params) {
  },
  logout: function () {
    var user = app.userInfo;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待...',
    });
    //调用后端
    wx.request({
      url: serverUrl + '/logout?userId=' + user.id,
      method: "POST",
      header: {
        'content-type': 'application/json'
      }, success: function (res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.status == 200) {

          wx.navigateTo({
            url: '../userLogin/login',
          }), wx.showToast({
            title: '注销成功',
            icon: 'sucess',
            duration: 1200
          })
        }
      }
    })
  }
})

