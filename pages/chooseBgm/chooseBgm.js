const app = getApp()

Page({
  data: {
    bgmList: [],
    serverUrl: "",
    videoParams: {}

  },

  onLoad: function(params) {
    var me = this;
    console.log(params);
    me.setData({
      videoParams: params
    })
    wx.showLoading({
      title: '请等待...',
    });
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/bgm/list',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status == 200) {
          var bgmList = res.data.data
          me.setData({
            bgmList: bgmList,
            serverUrl: serverUrl
          })
        }
      }

    })


  },

  upload: function(e) {
    console.log('eeeee', e)
    var me = this;
    var bgmId = e.detail.value.bgmId;
    var desc = e.detail.value.desc;
    var video = me.data.videoParams;
    var duration = video.duration;
    var tmpHeight = video.tmpHeight;
    var tmpWidth = video.tmpWidth;
    var tmpVideoUrl = video.tmpVideoUrl;
    var tmpCoverUrl = video.tmpCoverUrl;
    //上传短视频
    wx.showLoading({
      title: '上传中...',
    })
    console.log('descdescdesc*', desc)
    var serverUrl = app.serverUrl;
    wx.uploadFile({
      url: serverUrl + '/video/upload',
      formData: {
        userId: app.userInfo.id,
        bgmId: bgmId,
        videoDesc: desc,
        videoSeconds: duration,
        videoHeight: tmpHeight,
        videoWidth: tmpWidth
      },
      filePath: tmpVideoUrl,
      name: 'file',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        var data = JSON.parse(res.data)
        if (data.status == 200) {
          wx.navigateBack({
            delta: 1,
          }), wx.showToast({
            title: '上传成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'error'
          })
          // var videoId = data.data
          // wx.uploadFile({
          //   url: serverUrl + '/video/uploadCover',
          //   formData: {
          //     userId: app.userInfo.id,
          //     videoId: videoId
          //   },
          //   filePath: tmpCoverUrl,
          //   name: 'file',
          //   header: {
          //     'content-type': 'application/json'
          //   },
          //   success: function(res) {
          //     console.log(res);
          //     wx.hideLoading();
          //     var data = JSON.parse(res.data)
          //     if (data.status == 200) {

          //       wx.navigateBack({
          //         delta: 1,
          //       }), wx.showToast({
          //         title: '上传成功',
          //         icon: 'success'
          //       })
          //     } else {
          //       wx.showToast({
          //         title: '上传失败',
          //         icon: 'error'
          //       })
          //     }
          //   }
          // })
        }
      }
    })
  },
})