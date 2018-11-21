const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",

  },

  onLoad: function(params) {
    var me = this;
    var user = app.userInfo;
    var serverUrl = app.serverUrl

    wx.showLoading({
      title: '请等待...',
    })
    wx.request({
      url: serverUrl + '/user/query?userId=' + user.id,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          var userinfo = res.data.data;
          me.setData({
            fansCounts: userinfo.fansCounts,
            nickname: userinfo.nickname,
            followCounts: userinfo.followCounts,
            receiveLikeCounts: userinfo.receiveLikeCounts,
            faceUrl: serverUrl + userinfo.faceImage
            /**
             * 
             * e'>{{nickname}}</label>

    <button size='mini' class='primary' bindtap='uploadVideo'> 上传作品</button>
    <button size='mini' type='' class='logout' bindtap='logout'>注销</button>
    <view class='container-row'>
      <label class='info-items'>{{fansCounts}} 粉丝</label>
      <label class='info-items'>{{followCounts}} 关注</label>
      <label class='info-items'>{{receiveLikeCounts}} 获赞</label>
    </view>
             */
          })
        }
      }
    })
  },
  logout: function() {
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
      },
      success: function(res) {
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
  },
  changeFace: function() {
    //!!!!重要 作用域问题
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)

        wx.showLoading({
          title: '上传中...',
        })
        var serverUrl = app.serverUrl;
        wx.uploadFile({
          url: serverUrl + '/user/uploadFace?userId=' + app.userInfo.id,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {

            console.log(serverUrl)
            var data = JSON.parse(res.data)
            console.log(data)
            wx.hideLoading();
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功！',
                icon: 'success'
              });
              var imageUrl = data.data;
              //作用域联调
              me.setData({
                faceUrl: serverUrl + imageUrl
              })
            } else if (res.data.status == 500) {
              wx.showToast({
                title: res.data.msg,
              })
            }

          }
        })
      },
     


    })
  }, uploadVideo: function () {
    var me = this;
    wx.chooseVideo({
      sourceType: ['album'],
      success: function (res) {
        console.log(res);
        var duration = res.duration;
        var tmpHeight = res.height;
        var tmpWidth = res.width;
        var tmpVideoUrl = res.tempFilePath;
        var tmpCoverUrl = res.thumbTempFilePath;
        if(duration>10){
          wx.showToast({
            title:'视频长度不能超过10秒...',
            icon:'none',
            duration:2500
          } )
        }else{
          //TODO 打开选择bgm页面
        }
      }
    })
  }

})